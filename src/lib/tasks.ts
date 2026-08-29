import type { Task, Completion } from '../types'
import { diffDays } from './date'

/** 该任务在 date 这一天是否应该出现 */
export function isDueOn(task: Task, date: string): boolean {
  if (task.recurring) {
    const d = diffDays(date, task.recurring.startDate)
    return d >= 0 && d % task.recurring.intervalDays === 0
  }
  return task.scheduledDate === date
}

/** 该任务在 date 这一天是否已完成 */
export function isDoneOn(task: Task, date: string, completions: Completion[]): boolean {
  return completions.some((c) => c.taskId === task.id && c.date === date)
}

/** 某任务已打卡的日期集合 */
export function doneDatesOf(taskId: string, completions: Completion[]): Set<string> {
  return new Set(completions.filter((c) => c.taskId === taskId).map((c) => c.date))
}

/** 子任务进度 0~1；没有子任务返回 0 */
export function subtaskProgress(task: Task): number {
  if (task.subtasks.length === 0) return 0
  return task.subtasks.filter((s) => s.done).length / task.subtasks.length
}
