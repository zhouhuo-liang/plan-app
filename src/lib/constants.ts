import type { Priority, Category } from '../types'

export const PRIORITY_ORDER: Priority[] = ['high', 'medium', 'low']

export const PRIORITY_META: Record<Priority, { label: string }> = {
  high: { label: '高' },
  medium: { label: '中' },
  low: { label: '低' },
}

export const CATEGORY_ORDER: Category[] = ['study', 'work', 'life', 'health', 'other']

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  study: { label: '学习', color: '#3b82f6' },
  work: { label: '工作', color: '#94a3b8' },
  life: { label: '生活', color: '#f59e0b' },
  health: { label: '健康', color: '#fb7185' },
  other: { label: '其他', color: '#a8a29e' },
}

// 考研初试日期（预估 12 月 23-24 日，可按实际情况调整）
export const EXAM_DATE = '2028-12-23'
// 备考启动日期（对应阶段规划中的启动时间）
export const PLAN_START_DATE = '2026-09-06'

