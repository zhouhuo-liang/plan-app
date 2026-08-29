import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Task, Completion, FocusSession } from '../types'
import {
  loadTasks,
  saveTasks,
  loadCompletions,
  saveCompletions,
  loadFocusSessions,
  saveFocusSessions,
  loadCheckedMilestones,
  saveCheckedMilestones,
} from '../lib/storage'
import { todayStr } from '../lib/date'
import { beep } from '../lib/sound'

export function newId(): string {
  // 在非安全上下文（如局域网 HTTP / http://IP）中 crypto.randomUUID 不可用，需兜底
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
}

interface State {
  tasks: Task[]
  completions: Completion[]
  focusSessions: FocusSession[]
  checkedMilestones: string[]
}

type Action =
  | { type: 'addTask'; task: Task }
  | { type: 'updateTask'; id: string; patch: Partial<Task> }
  | { type: 'deleteTask'; id: string }
  | { type: 'toggleDone'; taskId: string; date: string }
  | { type: 'addFocusSession'; session: FocusSession }
  | { type: 'reorderTasks'; activeId: string; overId: string }
  | { type: 'toggleMilestone'; id: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTask':
      return { ...state, tasks: [action.task, ...state.tasks] }
    case 'updateTask':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, ...action.patch } : t)),
      }
    case 'deleteTask':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
        completions: state.completions.filter((c) => c.taskId !== action.id),
      }
    case 'toggleDone': {
      const alreadyDone = state.completions.some(
        (c) => c.taskId === action.taskId && c.date === action.date,
      )
      if (alreadyDone) {
        return {
          ...state,
          completions: state.completions.filter(
            (c) => !(c.taskId === action.taskId && c.date === action.date),
          ),
        }
      }
      const completion: Completion = {
        taskId: action.taskId,
        date: action.date,
        completedAt: Date.now(),
      }
      return { ...state, completions: [...state.completions, completion] }
    }
    case 'addFocusSession':
      return {
        ...state,
        focusSessions: [action.session, ...state.focusSessions],
      }
    case 'reorderTasks': {
      const from = state.tasks.findIndex((t) => t.id === action.activeId)
      const to = state.tasks.findIndex((t) => t.id === action.overId)
      if (from < 0 || to < 0 || from === to) return state
      const next = [...state.tasks]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return { ...state, tasks: next }
    }
    case 'toggleMilestone': {
      const exists = state.checkedMilestones.includes(action.id)
      return {
        ...state,
        checkedMilestones: exists
          ? state.checkedMilestones.filter((id) => id !== action.id)
          : [...state.checkedMilestones, action.id],
      }
    }
    default:
      return state
  }
}

export type PomodoroMode = 'work' | 'break'

export interface PomodoroState {
  mode: PomodoroMode
  running: boolean
  remainingSeconds: number
  durationSeconds: number
}

interface AppContextValue {
  tasks: Task[]
  completions: Completion[]
  focusSessions: FocusSession[]
  checkedMilestones: string[]
  addTask: (task: Task) => void
  updateTask: (id: string, patch: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleDone: (taskId: string, date: string) => void
  reorderTasks: (activeId: string, overId: string) => void
  toggleMilestone: (id: string) => void
  pomodoro: PomodoroState
  startPomodoro: () => void
  pausePomodoro: () => void
  resetPomodoro: () => void
  setPomodoroMode: (mode: PomodoroMode, durationSeconds: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const WORK_SECONDS = 25 * 60
const BREAK_SECONDS = 5 * 60

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState)

  const [pomodoro, setPomodoro] = useState<PomodoroState>({
    mode: 'work',
    running: false,
    remainingSeconds: WORK_SECONDS,
    durationSeconds: WORK_SECONDS,
  })
  const endAtRef = useRef(0)

  useEffect(() => {
    saveTasks(state.tasks)
  }, [state.tasks])

  useEffect(() => {
    saveCompletions(state.completions)
  }, [state.completions])

  useEffect(() => {
    saveFocusSessions(state.focusSessions)
  }, [state.focusSessions])

  useEffect(() => {
    saveCheckedMilestones(state.checkedMilestones)
  }, [state.checkedMilestones])

  const startPomodoro = useCallback(() => {
    setPomodoro((s) => {
      endAtRef.current = Date.now() + s.remainingSeconds * 1000
      return { ...s, running: true }
    })
  }, [])

  const pausePomodoro = useCallback(() => {
    setPomodoro((s) => ({ ...s, running: false }))
  }, [])

  const resetPomodoro = useCallback(() => {
    setPomodoro((s) => ({ ...s, running: false, remainingSeconds: s.durationSeconds }))
  }, [])

  const setPomodoroMode = useCallback((mode: PomodoroMode, durationSeconds: number) => {
    setPomodoro({ mode, running: false, remainingSeconds: durationSeconds, durationSeconds })
  }, [])

  // 全局计时：按 endAt 截止时间递减，切到别的 Tab 也不停
  useEffect(() => {
    if (!pomodoro.running) return
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000))
      if (remaining <= 0) {
        clearInterval(id)
        beep()
        if (pomodoro.mode === 'work') {
          dispatch({
            type: 'addFocusSession',
            session: {
              id: newId(),
              date: todayStr(),
              minutes: Math.round(pomodoro.durationSeconds / 60),
              completedAt: Date.now(),
            },
          })
          setPomodoro({
            mode: 'break',
            running: false,
            remainingSeconds: BREAK_SECONDS,
            durationSeconds: BREAK_SECONDS,
          })
        } else {
          setPomodoro({
            mode: 'work',
            running: false,
            remainingSeconds: WORK_SECONDS,
            durationSeconds: WORK_SECONDS,
          })
        }
        return
      }
      setPomodoro((s) => ({ ...s, remainingSeconds: remaining }))
    }, 250)
    return () => clearInterval(id)
  }, [pomodoro.running, pomodoro.mode, pomodoro.durationSeconds])

  const value = useMemo<AppContextValue>(
    () => ({
      tasks: state.tasks,
      completions: state.completions,
      focusSessions: state.focusSessions,
      checkedMilestones: state.checkedMilestones,
      addTask: (task) => dispatch({ type: 'addTask', task }),
      updateTask: (id, patch) => dispatch({ type: 'updateTask', id, patch }),
      deleteTask: (id) => dispatch({ type: 'deleteTask', id }),
      toggleDone: (taskId, date) => dispatch({ type: 'toggleDone', taskId, date }),
      reorderTasks: (activeId, overId) => dispatch({ type: 'reorderTasks', activeId, overId }),
      toggleMilestone: (id) => dispatch({ type: 'toggleMilestone', id }),
      pomodoro,
      startPomodoro,
      pausePomodoro,
      resetPomodoro,
      setPomodoroMode,
    }),
    [state, pomodoro, startPomodoro, pausePomodoro, resetPomodoro, setPomodoroMode],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function initState(): State {
  return {
    tasks: loadTasks(),
    completions: loadCompletions(),
    focusSessions: loadFocusSessions(),
    checkedMilestones: loadCheckedMilestones(),
  }
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (ctx == null) throw new Error('useApp 必须在 AppProvider 内使用')
  return ctx
}
