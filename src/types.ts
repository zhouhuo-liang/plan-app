export type Priority = 'high' | 'medium' | 'low'

export type Category = 'study' | 'work' | 'life' | 'health' | 'other'

export interface Subtask {
  id: string
  title: string
  done: boolean
}

export interface RecurringRule {
  /** 每隔多少天重复一次 */
  intervalDays: number
  /** 首次出现的日期，'YYYY-MM-DD' */
  startDate: string
}

export interface Task {
  id: string
  title: string
  notes: string
  priority: Priority
  /** 分类 */
  category: Category
  /** 截止日期，'YYYY-MM-DD'，无则为 null */
  dueDate: string | null
  subtasks: Subtask[]
  /** 重复规则；null 表示一次性任务 */
  recurring: RecurringRule | null
  /** 一次性任务归属的日期，'YYYY-MM-DD'；重复任务为 null */
  scheduledDate: string | null
  createdAt: number
}

export interface Completion {
  taskId: string
  date: string // 'YYYY-MM-DD'
  completedAt: number
}

export interface FocusSession {
  id: string
  date: string // 'YYYY-MM-DD'
  /** 完成的专注时长，分钟 */
  minutes: number
  completedAt: number
}
