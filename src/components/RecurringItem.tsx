import type { Task } from '../types'
import { useApp } from '../store/AppContext'
import { isDueOn, isDoneOn, doneDatesOf } from '../lib/tasks'
import { currentStreak, longestStreak, nextOccurrence } from '../lib/streak'
import { formatShort, todayStr } from '../lib/date'
import { CATEGORY_META } from '../lib/constants'

function RecurringItem({ task }: { task: Task }) {
  const { completions, toggleDone, deleteTask } = useApp()
  const rule = task.recurring!
  const today = todayStr()

  const dueToday = isDueOn(task, today)
  const doneToday = isDoneOn(task, today, completions)
  const doneSet = doneDatesOf(task.id, completions)
  const cur = currentStreak(doneSet, rule)
  const longest = longestStreak(doneSet, rule)
  const next = nextOccurrence(rule)

  return (
    <div className="habit-item">
      <div className="habit-main">
        <div className="habit-title-row">
          <span className="habit-title">{task.title}</span>
          <span className="badge" style={{ color: CATEGORY_META[task.category].color }}>
            {CATEGORY_META[task.category].label}
          </span>
        </div>
        <div className="habit-meta">
          每 {rule.intervalDays} 天 · 下次 {formatShort(next)}
        </div>
      </div>

      <div className="habit-streak">
        <span className="streak-current">{cur} 天</span>
        <span className="streak-longest">最长 {longest} 天</span>
      </div>

      <button
        type="button"
        className={doneToday ? 'btn btn-success' : 'btn btn-primary'}
        disabled={!dueToday}
        onClick={() => toggleDone(task.id, today)}
      >
        {doneToday ? '已打卡' : dueToday ? '打卡' : '未到'}
      </button>

      <button
        type="button"
        className="btn-icon"
        aria-label="删除习惯"
        onClick={() => deleteTask(task.id)}
      >
        ×
      </button>
    </div>
  )
}

export default RecurringItem
