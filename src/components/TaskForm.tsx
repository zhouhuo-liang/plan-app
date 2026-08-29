import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority, Category } from '../types'
import { useApp, newId } from '../store/AppContext'
import { PRIORITY_ORDER, PRIORITY_META, CATEGORY_ORDER, CATEGORY_META } from '../lib/constants'

function TaskForm({ date }: { date: string }) {
  const { addTask } = useApp()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('other')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addTask({
      id: newId(),
      title: trimmed,
      notes: '',
      priority,
      category,
      dueDate: dueDate || null,
      subtasks: [],
      recurring: null,
      scheduledDate: date,
      createdAt: Date.now(),
    })
    setTitle('')
    setDueDate('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input task-form-title"
        type="text"
        placeholder="添加任务…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="select"
        value={priority}
        aria-label="优先级"
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        {PRIORITY_ORDER.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_META[p].label}优先级
          </option>
        ))}
      </select>
      <select
        className="select"
        value={category}
        aria-label="分类"
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {CATEGORY_ORDER.map((c) => (
          <option key={c} value={c}>
            {CATEGORY_META[c].label}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="date"
        value={dueDate}
        aria-label="截止日期"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        添加
      </button>
    </form>
  )
}

export default TaskForm
