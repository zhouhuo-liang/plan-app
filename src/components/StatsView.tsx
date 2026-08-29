import { useApp } from '../store/AppContext'
import type { Task, Completion } from '../types'
import { isDueOn, isDoneOn, doneDatesOf } from '../lib/tasks'
import { currentStreak } from '../lib/streak'
import { overallStreak, computeBadges } from '../lib/gamification'
import { addDays, formatShort, startOfWeek, todayStr } from '../lib/date'
import Heatmap from './Heatmap'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function cssVar(name: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

function lastNDays(n: number): string[] {
  const today = todayStr()
  const days: string[] = []
  for (let i = n - 1; i >= 0; i--) days.push(addDays(today, -i))
  return days
}

function dueCountOn(tasks: Task[], date: string): number {
  return tasks.filter((t) => isDueOn(t, date)).length
}

function doneCountOn(tasks: Task[], completions: Completion[], date: string): number {
  return tasks.filter((t) => isDueOn(t, date) && isDoneOn(t, date, completions)).length
}

function rateText(rate: number | null): string {
  return rate == null ? '—' : `${Math.round(rate * 100)}%`
}

function StatsView() {
  const { tasks, completions, focusSessions } = useApp()

  const primary = cssVar('--primary', '#3b82f6')
  const muted = cssVar('--text-muted', '#9aa39c')
  const border = cssVar('--border', '#2b322d')
  const surface = cssVar('--surface', 'rgba(20, 24, 28, 0.32)')
  const text = cssVar('--text', '#eceae4')

  const today = todayStr()

  // 今日完成率
  const todayTotal = dueCountOn(tasks, today)
  const todayDone = doneCountOn(tasks, completions, today)
  const todayRate = todayTotal === 0 ? null : todayDone / todayTotal

  // 本周（周一到今天）完成率
  const weekStart = startOfWeek(today)
  const weekDays: string[] = []
  for (let i = 0; ; i++) {
    const day = addDays(weekStart, i)
    if (day > today) break
    weekDays.push(day)
  }
  let weekTotal = 0
  let weekDone = 0
  for (const d of weekDays) {
    weekTotal += dueCountOn(tasks, d)
    weekDone += doneCountOn(tasks, completions, d)
  }
  const weekRate = weekTotal === 0 ? null : weekDone / weekTotal

  // 进行中的最长连续打卡（习惯）
  let bestStreak = 0
  for (const t of tasks) {
    if (!t.recurring) continue
    const s = currentStreak(doneDatesOf(t.id, completions), t.recurring)
    if (s > bestStreak) bestStreak = s
  }

  const totalDone = completions.length

  // 专注统计
  const todayFocus = focusSessions.filter((s) => s.date === today)
  const todayFocusMinutes = todayFocus.reduce((sum, s) => sum + s.minutes, 0)
  const totalFocusMinutes = focusSessions.reduce((sum, s) => sum + s.minutes, 0)

  const badges = computeBadges({
    totalDone,
    streak: overallStreak(completions, today),
    focusCount: focusSessions.length,
    focusMinutes: totalFocusMinutes,
  })

  const weekData = lastNDays(7).map((d) => ({
    day: formatShort(d),
    count: completions.filter((c) => c.date === d).length,
  }))
  const monthData = lastNDays(30).map((d) => ({
    day: formatShort(d),
    count: completions.filter((c) => c.date === d).length,
  }))

  const tooltipStyle = {
    background: surface,
    border: `1px solid ${border}`,
    borderRadius: 8,
    color: text,
    fontSize: 12,
  }

  return (
    <section>
      <h2 className="page-title">统计</h2>

      <div className="chart-card">
        <h3 className="chart-title">打卡热力图（近 52 周）</h3>
        <Heatmap completions={completions} />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{rateText(todayRate)}</div>
          <div className="stat-label">
            {todayTotal === 0 ? '今日暂无任务' : `今日完成 ${todayDone}/${todayTotal}`}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{rateText(weekRate)}</div>
          <div className="stat-label">
            {weekTotal === 0 ? '本周暂无任务' : `本周完成 ${weekDone}/${weekTotal}`}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{bestStreak} 天</div>
          <div className="stat-label">连续打卡（进行中最佳）</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalDone}</div>
          <div className="stat-label">总共完成任务</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{todayFocusMinutes} 分</div>
          <div className="stat-label">今日专注（{todayFocus.length} 次）</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalFocusMinutes} 分</div>
          <div className="stat-label">累计专注（{focusSessions.length} 次）</div>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">近 7 天完成趋势</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weekData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={border} vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: muted, fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: muted, fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: primary, fillOpacity: 0.15 }} formatter={(value) => [`${value} 项`, '完成']} />
            <Bar dataKey="count" fill={primary} radius={[4, 4, 0, 0]} barSize={18} activeBar={{ fill: primary, fillOpacity: 1 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">近 30 天完成趋势</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={border} vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              minTickGap={24}
              tick={{ fill: muted, fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: muted, fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: primary, strokeWidth: 1 }} formatter={(value) => [`${value} 项`, '完成']} />
            <Area
              type="monotone"
              dataKey="count"
              stroke={primary}
              strokeWidth={2}
              fill={primary}
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">徽章墙</h3>
        <div className="badge-wall">
          {badges.map((b) => (
            <div key={b.id} className={b.earned ? 'badge-card earned' : 'badge-card'}>
              <div className="badge-icon">{b.icon}</div>
              <div className="badge-label">{b.label}</div>
              <div className="badge-desc">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsView

