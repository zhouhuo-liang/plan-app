import { useEffect, useMemo, useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { useApp } from '../store/AppContext'
import { isDueOn, isDoneOn } from '../lib/tasks'
import { addDays, formatDisplay, todayStr } from '../lib/date'
import { CATEGORY_ORDER, CATEGORY_META } from '../lib/constants'
import { overallStreak } from '../lib/gamification'
import type { Category } from '../types'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import ImportPlanModal from './ImportPlanModal'
import ProgressRing from './ProgressRing'
import Confetti from './Confetti'
import CountdownCard from './CountdownCard'

function TodayView() {
  const { tasks, reorderTasks, completions } = useApp()
  const [date, setDate] = useState(todayStr())
  const [query, setQuery] = useState('')
  const [catFilter, setCatFilter] = useState<Category | 'all'>('all')
  const [dragId, setDragId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [importOpen, setImportOpen] = useState(false)
  const [celebrate, setCelebrate] = useState(0)

  const isToday = date === todayStr()

  // 所选日期的完成度（含当天到期的重复任务）
  const dateTotal = tasks.filter((t) => isDueOn(t, date)).length
  const dateDone = tasks.filter((t) => isDueOn(t, date) && isDoneOn(t, date, completions)).length
  const rate = dateTotal === 0 ? 0 : dateDone / dateTotal
  const allDone = dateTotal > 0 && dateDone === dateTotal
  const streak = overallStreak(completions, todayStr())

  const encouragement =
    dateTotal === 0
      ? '今天还没安排任务，加一个吧 🌱'
      : rate === 0
        ? '新的一天，先搞定一个 💪'
        : rate < 0.5
          ? '已经在路上了，保持节奏 🔥'
          : rate < 1
            ? '过半了，再冲一把 ⚡'
            : '今天全部搞定，太棒了 🎉'

  // 当天全部完成时放一次撒花
  const prevAllDone = useRef(false)
  useEffect(() => {
    if (isToday && allDone && !prevAllDone.current) setCelebrate((c) => c + 1)
    prevAllDone.current = isToday && allDone
  }, [isToday, allDone])

  const dueTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks.filter((t) => {
      if (!isDueOn(t, date)) return false
      if (catFilter !== 'all' && t.category !== catFilter) return false
      if (q !== '' && !t.title.toLowerCase().includes(q) && !t.notes.toLowerCase().includes(q)) {
        return false
      }
      return true
    })
  }, [tasks, date, query, catFilter])

  function handleDragStart(id: string) {
    setDragId(id)
  }

  function handleDragOver(id: string, e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (dragId != null && id !== dragId) setOverId(id)
  }

  function handleDrop(id: string) {
    if (dragId != null && id !== dragId) reorderTasks(dragId, id)
    setDragId(null)
    setOverId(null)
  }

  function handleDragEnd() {
    setDragId(null)
    setOverId(null)
  }

  return (
    <section>
      <CountdownCard />
      <div className="today-hero">
        <ProgressRing progress={rate} size={116} strokeWidth={12}>
          <div className="hero-percent">{Math.round(rate * 100)}%</div>
          <div className="hero-percent-label">完成度</div>
        </ProgressRing>
        <div className="hero-info">
          <div className="hero-streak">
            {streak > 0 ? `🔥 连续打卡 ${streak} 天` : '🔥 今天开始打卡吧'}
          </div>
          <div className="hero-encourage">{encouragement}</div>
          <div className="hero-sub">
            {dateTotal === 0 ? '暂无任务' : `已完成 ${dateDone} / ${dateTotal} 个任务`}
          </div>
        </div>
      </div>

      <Confetti trigger={celebrate} />

      <div className="date-nav">
        <button
          type="button"
          className="btn btn-ghost"
          aria-label="前一天"
          onClick={() => setDate((d) => addDays(d, -1))}
        >
          ←
        </button>
        <div className="date-nav-label">
          <span className="date-nav-title">{formatDisplay(date)}</span>
          {!isToday && (
            <button type="button" className="btn btn-link" onClick={() => setDate(todayStr())}>
              回到今天
            </button>
          )}
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          aria-label="后一天"
          onClick={() => setDate((d) => addDays(d, 1))}
        >
          →
        </button>
      </div>

      <TaskForm date={date} />

      <div className="filter-row">
        <input
          className="input search-input"
          type="search"
          placeholder="搜索标题或备注…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          <button
            type="button"
            className={catFilter === 'all' ? 'chip active' : 'chip'}
            style={
              catFilter === 'all'
                ? { background: 'var(--primary)', borderColor: 'var(--primary)', color: 'var(--primary-contrast)' }
                : undefined
            }
            onClick={() => setCatFilter('all')}
          >
            全部
          </button>
          {CATEGORY_ORDER.map((c) => {
            const active = catFilter === c
            return (
              <button
                key={c}
                type="button"
                className={active ? 'chip active' : 'chip'}
                style={
                  active
                    ? { background: CATEGORY_META[c].color, borderColor: CATEGORY_META[c].color, color: '#fff' }
                    : undefined
                }
                onClick={() => setCatFilter(active ? 'all' : c)}
              >
                <span
                  className="chip-dot"
                  style={{ background: active ? '#fff' : CATEGORY_META[c].color }}
                />
                {CATEGORY_META[c].label}
              </button>
            )
          })}
        </div>
        <button type="button" className="btn btn-ghost import-btn" onClick={() => setImportOpen(true)}>
          ⬇ 导入计划
        </button>
      </div>

      <div className="task-list-header">
        <h2 className="task-list-title">每日任务</h2>
        {dueTasks.length > 0 && <span className="task-list-count">{dueTasks.length} 项</span>}
      </div>

      <div className="task-list">
        {dueTasks.length === 0 ? (
          <div className="empty">这一天还没有任务，添加一个开始吧</div>
        ) : (
          dueTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              date={date}
              dragging={dragId === t.id}
              dropTarget={overId === t.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
          ))
        )}
      </div>

      <ImportPlanModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImported={(firstDate) => {
          setImportOpen(false)
          setDate(firstDate)
        }}
      />
    </section>
  )
}

export default TodayView

