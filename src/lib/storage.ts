import type { Task, Completion, FocusSession, Category } from '../types'

const TASKS_KEY = 'plan.tasks'
const COMPLETIONS_KEY = 'plan.completions'
const FOCUS_KEY = 'plan.focusSessions'
const MILESTONES_KEY = 'plan.checkedMilestones'

const CATEGORIES: Category[] = ['study', 'work', 'life', 'health', 'other']

// 旧版（图形学考研）分类 → 通用分类的映射，老数据无需清库
const LEGACY_CATEGORY_MAP: Record<string, Category> = {
  graphics: 'study',
  math: 'study',
  '408': 'study',
  english: 'study',
  politics: 'study',
}

// 目前用 localStorage 实现。以后换后端时，保持这几个函数签名不变即可，界面无需改动。

export function loadTasks(): Task[] {
  const tasks = readJSON<Task[]>(TASKS_KEY, [])
  // 旧数据可能没有 category 或用了旧分类名，统一补成通用分类
  return tasks.map((t) => ({
    ...t,
    category: CATEGORIES.includes(t.category) ? t.category : LEGACY_CATEGORY_MAP[t.category] ?? 'other',
  }))
}

export function saveTasks(tasks: Task[]): void {
  writeJSON(TASKS_KEY, tasks)
}

export function loadCompletions(): Completion[] {
  return readJSON<Completion[]>(COMPLETIONS_KEY, [])
}

export function saveCompletions(completions: Completion[]): void {
  writeJSON(COMPLETIONS_KEY, completions)
}

export function loadFocusSessions(): FocusSession[] {
  return readJSON<FocusSession[]>(FOCUS_KEY, [])
}

export function saveFocusSessions(sessions: FocusSession[]): void {
  writeJSON(FOCUS_KEY, sessions)
}

export function loadCheckedMilestones(): string[] {
  return readJSON<string[]>(MILESTONES_KEY, [])
}

export function saveCheckedMilestones(ids: string[]): void {
  writeJSON(MILESTONES_KEY, ids)
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 忽略存储配额等错误
  }
}
