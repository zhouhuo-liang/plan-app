import { useState } from 'react'
import { useApp } from '../store/AppContext'
import { todayStr } from '../lib/date'

const WORK_PRESETS = [15, 25, 45, 60]
const BREAK_PRESETS = [5, 10]

function FocusView() {
  const { pomodoro, startPomodoro, pausePomodoro, resetPomodoro, setPomodoroMode, focusSessions } =
    useApp()
  const [workMin, setWorkMin] = useState(25)
  const [breakMin, setBreakMin] = useState(5)

  const { mode, running, remainingSeconds, durationSeconds } = pomodoro

  const R = 100
  const CIRCUMFERENCE = 2 * Math.PI * R
  const remainingFraction = durationSeconds > 0 ? remainingSeconds / durationSeconds : 0
  const offset = CIRCUMFERENCE * (1 - remainingFraction)
  const ringColor = mode === 'work' ? 'var(--primary)' : 'var(--success)'

  const mm = Math.floor(remainingSeconds / 60)
  const ss = remainingSeconds % 60
  const timeText = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`

  const todayFocus = focusSessions.filter((s) => s.date === todayStr())
  const todayMinutes = todayFocus.reduce((sum, s) => sum + s.minutes, 0)

  function selectWork(n: number) {
    setWorkMin(n)
    if (mode === 'work') setPomodoroMode('work', n * 60)
  }

  function selectBreak(n: number) {
    setBreakMin(n)
    if (mode === 'break') setPomodoroMode('break', n * 60)
  }

  return (
    <section>
      <h2 className="page-title">专注计时</h2>
      <div className="focus-view">
        <div className="card focus-card">
          <div className="focus-tabs">
            <button
              type="button"
              className={mode === 'work' ? 'focus-tab active' : 'focus-tab'}
              onClick={() => setPomodoroMode('work', workMin * 60)}
            >
              专注
            </button>
            <button
              type="button"
              className={mode === 'break' ? 'focus-tab active' : 'focus-tab'}
              onClick={() => setPomodoroMode('break', breakMin * 60)}
            >
              休息
            </button>
          </div>

          <div className="focus-ring-wrap">
            <svg width="260" height="260" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r={R} fill="none" stroke="var(--border)" strokeWidth="12" />
              <circle
                cx="130"
                cy="130"
                r={R}
                fill="none"
                stroke={ringColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                transform="rotate(-90 130 130)"
              />
            </svg>
            <div className="focus-time">
              <span className="focus-time-value">{timeText}</span>
              <span className="focus-time-mode">{mode === 'work' ? '专注中' : '休息中'}</span>
            </div>
          </div>

          <div className="focus-controls">
            {running ? (
              <button type="button" className="btn btn-ghost focus-start" onClick={pausePomodoro}>
                暂停
              </button>
            ) : (
              <button type="button" className="btn btn-primary focus-start" onClick={startPomodoro}>
                开始
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={resetPomodoro}>
              重置
            </button>
          </div>

          <div className="focus-presets">
            {(mode === 'work' ? WORK_PRESETS : BREAK_PRESETS).map((n) => (
              <button
                key={n}
                type="button"
                className={durationSeconds === n * 60 ? 'preset-btn active' : 'preset-btn'}
                onClick={() => (mode === 'work' ? selectWork(n) : selectBreak(n))}
              >
                {n} 分钟
              </button>
            ))}
          </div>

          <div className="focus-today">
            今日已专注 {todayFocus.length} 次 · 共 {todayMinutes} 分钟
          </div>
        </div>
      </div>
    </section>
  )
}

export default FocusView
