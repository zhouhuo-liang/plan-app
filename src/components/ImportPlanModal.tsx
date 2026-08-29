import { useEffect, useMemo, useState } from 'react'
import { useApp, newId } from '../store/AppContext'
import { parsePlanInput, IMPORT_TEMPLATE } from '../lib/importPlan'
import { firstWeekPlanText } from '../data/firstWeekPlan'
import { formatDisplay } from '../lib/date'

interface Props {
  open: boolean
  onClose: () => void
  onImported: (firstDate: string) => void
}

function ImportPlanModal({ open, onClose, onImported }: Props) {
  const { addTask } = useApp()
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const { tasks, errors } = useMemo(() => parsePlanInput(text), [text])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  // 按日期分组预览
  const groups = new Map<string, typeof tasks>()
  for (const t of tasks) {
    const list = groups.get(t.date) ?? []
    list.push(t)
    groups.set(t.date, list)
  }
  const sortedDates = [...groups.keys()].sort()

  function handleCopy() {
    const write = async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(IMPORT_TEMPLATE)
        } else {
          // 非安全上下文（局域网 HTTP）下 navigator.clipboard 不可用，用临时元素降级
          const ta = document.createElement('textarea')
          ta.value = IMPORT_TEMPLATE
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // 忽略复制失败
      }
    }
    void write()
  }

  function handleImport() {
    if (tasks.length === 0) return
    const firstDate = sortedDates[0]
    for (const t of tasks) {
      addTask({
        id: newId(),
        title: t.title,
        notes: t.notes,
        priority: 'medium',
        category: 'study',
        dueDate: null,
        subtasks: [],
        recurring: null,
        scheduledDate: t.date,
        createdAt: Date.now(),
      })
    }
    setText('')
    onImported(firstDate)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">导入每日计划</h2>
          <button type="button" className="btn btn-ghost" aria-label="关闭" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-hint">
            把别的 AI 排好的计划粘贴到下面（支持「日期 | 标题 | 完成标准」或 JSON）。点「载入第一周示例」可看到标准格式；没有格式要求时，点「复制格式说明」拿给 AI。
          </p>

          <div className="modal-toolbar">
            <button type="button" className="btn btn-ghost" onClick={() => setText(firstWeekPlanText())}>
              📅 载入第一周示例
            </button>
                          <button type="button" className="btn btn-ghost" onClick={handleCopy}>
                {copied ? '✓ 已复制' : '📋 复制格式说明'}
              </button>
          </div>

          <textarea
            className="input modal-textarea"
            placeholder={
              '2026-09-13 | 读《C++ Primer》第 15 章 继承 | 完成标准：能说出虚函数与多态的关系\n2026-09-13 | 墨墨背单词 50 个\n2026-09-14 | 读第 15 章 面向对象设计'
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
          />

          {tasks.length > 0 && (
            <div className="modal-preview">
              <div className="modal-preview-head">
                <span>已解析 {tasks.length} 个任务</span>
                {errors.length > 0 && <span className="modal-error">跳过 {errors.length} 行</span>}
              </div>
              <div className="modal-preview-list">
                {sortedDates.map((d) => {
                  const list = groups.get(d) ?? []
                  const label = formatDisplay(d)
                  return (
                    <div key={d} className="modal-preview-day">
                      <div className="modal-preview-date">{label}</div>
                      {list.map((t, i) => (
                        <div key={`${d}-${i}`} className="modal-preview-item">
                          <span>{t.title}</span>
                          {t.notes && <span className="modal-preview-notes">{t.notes}</span>}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            取消
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={tasks.length === 0}
            onClick={handleImport}
          >
            确认导入 {tasks.length > 0 ? `${tasks.length} 个任务` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportPlanModal
