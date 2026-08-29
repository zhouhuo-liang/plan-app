import type { Completion } from '../types'
import { addDays } from './date'

/** 总连续打卡天数（任意任务完成即算一天；今天没打不算断） */
export function overallStreak(completions: Completion[], today: string): number {
  const done = new Set(completions.map((c) => c.date))
  let cursor = done.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (done.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export interface Badge {
  id: string
  icon: string
  label: string
  desc: string
}

export interface BadgeResult extends Badge {
  earned: boolean
}

const BADGES: Badge[] = [
  { id: 'first-step', icon: '🌱', label: '第一步', desc: '累计完成 1 个任务' },
  { id: 'streak-3', icon: '🔥', label: '小火苗', desc: '连续打卡 3 天' },
  { id: 'streak-7', icon: '📅', label: '一周不断', desc: '连续打卡 7 天' },
  { id: 'streak-30', icon: '🏆', label: '月度大师', desc: '连续打卡 30 天' },
  { id: 'tasks-50', icon: '✅', label: '任务达人', desc: '累计完成 50 个任务' },
  { id: 'tasks-200', icon: '⚡', label: '高效引擎', desc: '累计完成 200 个任务' },
  { id: 'focus-first', icon: '⏱️', label: '专注新手', desc: '完成 1 次专注' },
  { id: 'focus-600', icon: '🧠', label: '深度专注', desc: '累计专注 600 分钟' },
  { id: 'tasks-500', icon: '🚀', label: '登堂入室', desc: '累计完成 500 个任务' },
]

export function computeBadges(input: {
  totalDone: number
  streak: number
  focusCount: number
  focusMinutes: number
}): BadgeResult[] {
  return BADGES.map((b) => {
    let earned = false
    switch (b.id) {
      case 'first-step':
        earned = input.totalDone >= 1
        break
      case 'streak-3':
        earned = input.streak >= 3
        break
      case 'streak-7':
        earned = input.streak >= 7
        break
      case 'streak-30':
        earned = input.streak >= 30
        break
      case 'tasks-50':
        earned = input.totalDone >= 50
        break
      case 'tasks-200':
        earned = input.totalDone >= 200
        break
      case 'focus-first':
        earned = input.focusCount >= 1
        break
      case 'focus-600':
        earned = input.focusMinutes >= 600
        break
      case 'tasks-500':
        earned = input.totalDone >= 500
        break
    }
    return { ...b, earned }
  })
}
