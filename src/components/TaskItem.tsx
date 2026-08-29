import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CSSProperties, DragEvent } from 'react'
import type { Task, Priority, Category } from '../types'
import { useApp, newId } from '../store/AppContext'
import { isDoneOn } from '../lib/tasks'
import { PRIORITY_ORDER, PRIORITY_META, CATEGORY_ORDER, CATEGORY_META } from '../lib/constants'
import { formatShort } from '../lib/date'

const BURST_EMOJIS = ['✨', '⭐', '💫', '🌟', '🔥', '💥', '⚡', '🎉', '🎊', '🌈']

function TaskBurst({ x, y, seed }: { x: number; y: number; seed: number }) {
  const particles = useMemo(() => {
    const COUNT = 36
    return Array.from({ length: COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / COUNT + Math.random() * 0.4
      const dist = 80 + Math.random() * 80
      const dx = Math.cos(angle) * dist
      const dy = Math.sin(angle) * dist - 35
      const fall = 60 + Math.random() * 70
      const spin = (Math.random() - 0.5) * 540
      const size = 16 + Math.random() * 14
      const emoji = BURST_EMOJIS[i % BURST_EMOJIS.length]
      const delay = Math.random() * 0.04
      return { id: `${seed}-${i}`, dx, dy, fall, spin, size, emoji, delay }
    })
  }, [seed])

  return createPortal(
    <div className="task-burst" style={{ left: x, top: y }}>
      <span className="task-flash" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="task-particle"
          style={
            {
              fontSize: p.size,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--fall': `${p.fall}px`,
              '--spin': `${p.spin}deg`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>,
    document.body
  )
}

interface Props {
  task: Task
  date: string
  dragging: boolean
  dropTarget: boolean
  onDragStart: (id: string) => void
  onDragOver: (id: string, e: DragEvent<HTMLDivElement>) => void
  onDrop: (id: string) => void
  onDragEnd: () => void
}

function TaskItem({
  task,
  date,
  dragging,
  dropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: Props) {
  const { completions, toggleDone, updateTask, deleteTask } = useApp()
  const [expanded, setExpanded] = useState(false)
  const [subtaskTitle, setSubtaskTitle] = useState('')
  const [justDone, setJustDone] = useState(false)
  const [burst, setBurst] = useState(0)
  const [burstPos, setBurstPos] = useState<{ x: number; y: number } | null>(null)
  const checkRef = useRef<HTMLSpanElement>(null)

  const done = isDoneOn(task, date, completions)
  const hasSubtasks = task.subtasks.length > 0
  const doneSubtasks = task.subtasks.filter((s) => s.done).length
  const overdue = task.dueDate != null && task.dueDate < date && !done

  const itemClass = [
    'task-item',
    done ? 'done' : '',
    justDone ? 'just-done' : '',
    dragging ? 'dragging' : '',
    dropTarget ? 'drop-target' : '',
  ]
    .filter(Boolean)
    .join(' ')

  function handleToggle() {
    const wasDone = done
    toggleDone(task.id, date)
    if (!wasDone) {
      setJustDone(true)
      const rect = checkRef.current?.getBoundingClientRect()
      if (rect) {
        setBurstPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }
      setBurst((b) => b + 1)
      window.setTimeout(() => setJustDone(false), 650)
    }
  }

  function toggleSubtask(id: string) {
    updateTask(task.id, {
      subtasks: task.subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    })
  }

  function addSubtask() {
    const trimmed = subtaskTitle.trim()
    if (!trimmed) return
    updateTask(task.id, {
      subtasks: [...task.subtasks, { id: newId(), title: trimmed, done: false }],
    })
    setSubtaskTitle('')
  }

  function removeSubtask(id: string) {
    updateTask(task.id, { subtasks: task.subtasks.filter((s) => s.id !== id) })
  }

  return (
    <div
      className={itemClass}
      style={{ '--accent': CATEGORY_META[task.category].color } as CSSProperties}
      onDragOver={(e) => onDragOver(task.id, e)}
      onDrop={() => onDrop(task.id)}
    >
      <div className="task-row">
        <span
          className="drag-handle"
          draggable
          onDragStart={() => onDragStart(task.id)}
          onDragEnd={onDragEnd}
          aria-label="拖动排序"
          title="拖动排序"
        >
          ⠿
        </span>

        <label className="task-check">
          <input
            type="checkbox"
            checked={done}
            onChange={handleToggle}
          />
          <span className="task-checkbox" aria-hidden="true" ref={checkRef} />
        </label>

        <div className="task-main" onClick={() => setExpanded((v) => !v)}>
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            <span className={`badge priority-${task.priority}`}>
              {PRIORITY_META[task.priority].label}
            </span>
            <span className="badge" style={{ color: CATEGORY_META[task.category].color }}>
              {CATEGORY_META[task.category].label}
            </span>
            {task.dueDate != null && (
              <span className={overdue ? 'badge due-overdue' : 'badge'}>
                {formatShort(task.dueDate)} 截止
              </span>
            )}
            {hasSubtasks && (
              <span className="badge">
                {doneSubtasks}/{task.subtasks.length}
              </span>
            )}
            {task.notes.trim() !== '' && <span className="badge">备注</span>}
          </div>
        </div>

        <button
          type="button"
          className="btn-icon"
          aria-label="展开"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? '▾' : '▸'}
        </button>
      </div>

      {expanded && (
        <div className="task-detail">
          <div className="field">
            <label className="label">优先级</label>
            <select
              className="select"
              value={task.priority}
              onChange={(e) => updateTask(task.id, { priority: e.target.value as Priority })}
            >
              {PRIORITY_ORDER.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_META[p].label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="label">分类</label>
            <select
              className="select"
              value={task.category}
              onChange={(e) => updateTask(task.id, { category: e.target.value as Category })}
            >
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_META[c].label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="label">截止日期</label>
            <input
              className="input"
              type="date"
              value={task.dueDate ?? ''}
              onChange={(e) => updateTask(task.id, { dueDate: e.target.value || null })}
            />
          </div>

          <div className="field">
            <label className="label">备注</label>
            <textarea
              className="textarea"
              rows={2}
              value={task.notes}
              placeholder="写点备注…"
              onChange={(e) => updateTask(task.id, { notes: e.target.value })}
            />
          </div>

          <div className="field">
            <label className="label">子任务</label>
            {task.subtasks.map((s) => (
              <div key={s.id} className="subtask-item">
                <label className="subtask-check">
                  <input type="checkbox" checked={s.done} onChange={() => toggleSubtask(s.id)} />
                  <span className={s.done ? 'subtask-title done' : 'subtask-title'}>
                    {s.title}
                  </span>
                </label>
                <button
                  type="button"
                  className="btn-icon"
                  aria-label="删除子任务"
                  onClick={() => removeSubtask(s.id)}
                >
                  ×
                </button>
              </div>
            ))}
            <div className="add-subtask">
              <input
                className="input"
                type="text"
                placeholder="添加子任务…"
                value={subtaskTitle}
                onChange={(e) => setSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSubtask()
                  }
                }}
              />
              <button type="button" className="btn btn-ghost" onClick={addSubtask}>
                添加
              </button>
            </div>
          </div>

          <button type="button" className="btn btn-danger" onClick={() => deleteTask(task.id)}>
            删除任务
          </button>
        </div>
      )}

      {burst > 0 && burstPos && <TaskBurst x={burstPos.x} y={burstPos.y} seed={burst} />}
    </div>
  )
}

export default TaskItem
