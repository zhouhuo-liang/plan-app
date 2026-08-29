import { PHASES } from '../data/phases'
import type { Phase } from '../data/phases'
import { diffDays, parseDate, todayStr } from '../lib/date'
import { EXAM_DATE, PLAN_START_DATE } from '../lib/constants'

function currentPhase(today: string): Phase | null {
  const ym = today.slice(0, 7)
  return PHASES.find((p) => ym >= p.start && ym <= p.end) ?? null
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function breakdown(totalDays: number): { years: number; months: number; days: number } {
  const years = Math.floor(totalDays / 365)
  const rest = totalDays - years * 365
  const months = Math.floor(rest / 30)
  const days = rest - months * 30
  return { years, months, days }
}

function breakdownText(totalDays: number): string {
  const b = breakdown(totalDays)
  const parts: string[] = []
  if (b.years > 0) parts.push(`${b.years} 年`)
  if (b.months > 0) parts.push(`${b.months} 个月`)
  parts.push(`${b.days} 天`)
  return parts.join(' · ')
}

/** 考研倒计时 + 当前阶段卡片：首页顶部和计划总览各放一张 */
function CountdownCard() {
  const today = todayStr()
  const examDate = parseDate(EXAM_DATE)
  const daysLeft = diffDays(EXAM_DATE, today)

  const totalDays = Math.max(1, diffDays(EXAM_DATE, PLAN_START_DATE))
  const elapsed = clamp(diffDays(today, PLAN_START_DATE), 0, totalDays)
  const progress = Math.round((elapsed / totalDays) * 100)

  const phase = currentPhase(today)
  const examPassed = daysLeft < 0
  const notStarted = diffDays(today, PLAN_START_DATE) < 0

  return (
    <div className="countdown-card">
      <div className="countdown-main">
        <div className="countdown-label">{examPassed ? '初试已结束，全力冲刺复试' : '距离考研初试还有'}</div>
        {examPassed ? (
          <div className="countdown-days">
            <span className="countdown-num">复试</span>
          </div>
        ) : (
          <div className="countdown-days">
            <span className="countdown-num">{Math.max(0, daysLeft)}</span> 天
          </div>
        )}
        <div className="countdown-sub">
          {examDate.getFullYear()} 年 {examDate.getMonth() + 1} 月 {examDate.getDate()} 日 · 初试
          {!examPassed && daysLeft > 0 ? `（${breakdownText(daysLeft)}）` : ''}
        </div>
      </div>

      <div className="countdown-side">
        <div className="countdown-phase-label">当前备考阶段</div>
        <div className="countdown-phase-title">
          {phase == null
            ? notStarted
              ? '即将进入：大二上学期 · 破冰 + 双线启动'
              : '阶段规划已更新，去计划页看看吧'
            : `${phase.title} · ${phase.tagline}`}
        </div>
        <div className="countdown-bar">
          <div className="countdown-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="countdown-bar-label">
          {notStarted
            ? `备考将于 ${PLAN_START_DATE} 正式启动`
            : examPassed
              ? '全程备考完成，祝上岸 🎉'
              : `备考进度 ${progress}%（${PLAN_START_DATE} → ${EXAM_DATE}）`}
        </div>
      </div>
    </div>
  )
}

export default CountdownCard
