import type { Completion } from '../types'
import { addDays, dayOfWeek, formatMonth, parseDate, todayStr } from '../lib/date'

const CELL = 12
const GAP = 3
const STRIDE = CELL + GAP
const WEEKS = 52

function levelOf(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1
  if (n === 2) return 2
  if (n === 3) return 3
  return 4
}

function Heatmap({ completions }: { completions: Completion[] }) {
  const today = todayStr()

  const counts = new Map<string, number>()
  for (const c of completions) {
    counts.set(c.date, (counts.get(c.date) ?? 0) + 1)
  }

  // 起点定在 51 周前的那个周日，这样最后一列正好是本周（周日开头）
  const start = addDays(today, -(WEEKS - 1) * 7 - dayOfWeek(today))

  const weeks: string[][] = []
  for (let w = 0; w < WEEKS; w++) {
    const col: string[] = []
    for (let d = 0; d < 7; d++) col.push(addDays(start, w * 7 + d))
    weeks.push(col)
  }

  // 月份标注：某列第一天进入新月份时标一下
  const monthLabels: { index: number; label: string }[] = []
  let prevMonth = -1
  weeks.forEach((col, i) => {
    const month = parseDate(col[0]).getMonth()
    if (month !== prevMonth) {
      monthLabels.push({ index: i, label: formatMonth(col[0]) })
      prevMonth = month
    }
  })

  return (
    <div className="heatmap">
      <div className="heatmap-wrap">
        <div className="heatmap-weekdays">
          {['日', '一', '二', '三', '四', '五', '六'].map((w, i) => (
            <span
              key={i}
              className="heatmap-weekday"
              style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
            >
              {w}
            </span>
          ))}
        </div>
        <div className="heatmap-body">
          <div className="heatmap-months">
            {monthLabels.map(({ index, label }) => (
              <span key={index} className="heatmap-month" style={{ left: index * STRIDE }}>
                {label}
              </span>
            ))}
          </div>
          <div className="heatmap-grid">
            {weeks.map((col, i) => (
              <div key={i} className="heat-col">
                {col.map((day) => {
                  const n = counts.get(day) ?? 0
                  return (
                    <span
                      key={day}
                      className={`heat-cell heat-${levelOf(n)}`}
                      title={`${day} · ${n} 次完成`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="heatmap-legend">
        <span>少</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`heat-cell heat-${l}`} />
        ))}
        <span>多</span>
      </div>
    </div>
  )
}

export default Heatmap
