const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function toDateStr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayStr(): string {
  return toDateStr(new Date())
}

/** 把 'YYYY-MM-DD' 解析为本地时区的 Date（避免 UTC 偏移导致日期错位） */
export function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(s: string, n: number): string {
  const d = parseDate(s)
  d.setDate(d.getDate() + n)
  return toDateStr(d)
}

/** a - b 相差的天数 */
export function diffDays(a: string, b: string): number {
  return Math.round((parseDate(a).getTime() - parseDate(b).getTime()) / 86400000)
}

/** 本周一（以周一为一周起点） */
export function startOfWeek(s: string): string {
  const offset = (parseDate(s).getDay() + 6) % 7
  return addDays(s, -offset)
}

/** 星期几：0=周日 … 6=周六（与 Date.getDay() 一致） */
export function dayOfWeek(s: string): number {
  return parseDate(s).getDay()
}

export function formatDisplay(s: string): string {
  const d = parseDate(s)
  return `${d.getMonth() + 1}月${d.getDate()}日 ${WEEKDAYS[d.getDay()]}`
}

export function formatShort(s: string): string {
  const d = parseDate(s)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

/** 例如 '2026-08-27' -> '8月'（用于热力图月份标注） */
export function formatMonth(s: string): string {
  return `${parseDate(s).getMonth() + 1}月`
}
