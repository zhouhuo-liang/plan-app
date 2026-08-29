import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority, Category } from '../types'
import { useApp, newId } from '../store/AppContext'
import { PRIORITY_ORDER, PRIORITY_META, CATEGORY_ORDER, CATEGORY_META } from '../lib/constants'
import { todayStr } from '../lib/date'
import RecurringItem from './RecurringItem'

function HabitsView() {
  const { tasks, addTask } = useApp()
  const [title, setTitle] = useState('')
  const [interval, setInterval] = useState('1')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('other')

  const recurring = tasks.filter((t) => t.recurring != null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = title.trim()
    const n = Number(interval)
    if (!trimmed || !Number.isInteger(n) || n < 1) return
    addTask({
      id: newId(),
      title: trimmed,
      notes: '',
      priority,
      category,
      dueDate: null,
      subtasks: [],
      recurring: { intervalDays: n, startDate: todayStr() },
      scheduledDate: null,
      createdAt: Date.now(),
    })
    setTitle('')
  }

  return (
    <section>
      <h2 className="page-title">习惯</h2>
      <form className="habit-form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="新习惯名称…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="inline-label">
          每
          <input
            className="input input-number"
            type="number"
            min={1}
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
          天
        </label>
        <select
          className="select"
          value={priority}
          aria-label="优先级"
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {PRIORITY_ORDER.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_META[p].label}
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
        <button type="submit" className="btn btn-primary">
          创建
        </button>
      </form>

      <div className="habit-list">
        {recurring.length === 0 ? (
          <div className="empty">还没有习惯，创建一个重复任务开始打卡吧</div>
        ) : (
          recurring.map((t) => <RecurringItem key={t.id} task={t} />)
        )}
      </div>
    </section>
  )
}

export default HabitsView
