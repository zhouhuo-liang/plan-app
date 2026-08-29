import type { RecurringRule } from '../types'
import { addDays, diffDays, todayStr } from './date'

/** 该日期是否是重复任务的一次出现 */
export function isOccurrence(date: string, rule: RecurringRule): boolean {
  const d = diffDays(date, rule.startDate)
  return d >= 0 && d % rule.intervalDays === 0
}

/** 不晚于 date 的最近一次出现；date 早于开始日则返回 null */
function occurrenceOnOrBefore(date: string, rule: RecurringRule): string | null {
  const d = diffDays(date, rule.startDate)
  if (d < 0) return null
  return addDays(rule.startDate, d - (d % rule.intervalDays))
}

/** 当前连续打卡天数（今天这次还没打，不会打断已连续的天数） */
export function currentStreak(doneDates: Set<string>, rule: RecurringRule): number {
  let cursor = occurrenceOnOrBefore(todayStr(), rule)
  if (cursor == null) return 0
  if (!doneDates.has(cursor)) {
    cursor = addDays(cursor, -rule.intervalDays)
    if (cursor < rule.startDate) return 0
  }
  let streak = 0
  while (cursor >= rule.startDate && doneDates.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -rule.intervalDays)
  }
  return streak
}

/** 最长连续打卡天数 */
export function longestStreak(doneDates: Set<string>, rule: RecurringRule): number {
  const sorted = [...doneDates].filter((d) => isOccurrence(d, rule)).sort()
  let longest = 0
  let run = 0
  let prev: string | null = null
  for (const d of sorted) {
    run = prev != null && diffDays(d, prev) === rule.intervalDays ? run + 1 : 1
    if (run > longest) longest = run
    prev = d
  }
  return longest
}

/** 下一次出现日（今天若正好是出现日，也算今天） */
export function nextOccurrence(rule: RecurringRule): string {
  const today = todayStr()
  const before = occurrenceOnOrBefore(today, rule)
  if (before == null) return rule.startDate
  return before < today ? addDays(before, rule.intervalDays) : before
}
