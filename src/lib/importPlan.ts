export interface ParsedTask {
  date: string // 'YYYY-MM-DD'
  title: string
  notes: string
}

export interface ParseResult {
  tasks: ParsedTask[]
  /** 跳过的行（格式无法解析） */
  errors: string[]
}

/**
 * 把粘贴进来的文本/JSON 解析成每日任务。
 * 支持两种格式：
 *   1) JSON：`[{ "date": "2026-09-13", "title": "...", "notes": "..." }]`
 *   2) 纯文本：一行一个任务 `日期 | 标题 | 完成标准`，或「日期头 + 项目符号列表」。
 */
export function parsePlanInput(raw: string): ParseResult {
  const text = raw.trim()
  if (!text) return { tasks: [], errors: [] }

  if (text.startsWith('[') || text.startsWith('{')) {
    const json = parseJson(text)
    if (json != null) return { tasks: json, errors: [] }
  }

  return parseText(text)
}

function parseJson(text: string): ParsedTask[] | null {
  try {
    const data: unknown = JSON.parse(text)
    const arr = Array.isArray(data) ? data : [data]
    const tasks: ParsedTask[] = []
    for (const item of arr) {
      if (item == null || typeof item !== 'object') continue
      const obj = item as Record<string, unknown>
      const date = normalizeDate(String(obj.date ?? obj.scheduledDate ?? ''))
      const title = String(obj.title ?? '').trim()
      if (!date || !title) continue
      const notes = String(obj.notes ?? obj.note ?? '').trim()
      tasks.push({ date, title, notes })
    }
    return tasks
  } catch {
    return null
  }
}

function parseText(text: string): ParseResult {
  const tasks: ParsedTask[] = []
  const errors: string[] = []
  let currentDate: string | null = null

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) continue
    // 注释 / 标题行
    if (line.startsWith('#') || line.startsWith('//')) continue

    // 整行是一个日期（充当「日期头」）
    const asDate = normalizeDate(line)
    if (asDate) {
      currentDate = asDate
      continue
    }

    // 去掉行首项目符号：- * • · 或 1. 1、 1)
    const stripped = line.replace(/^[-*•·]\s*/, '').replace(/^\d{1,2}[.、)]\s*/, '')
    const body = stripped !== line ? stripped : line

    // 行首带日期（inline 格式：日期 | 标题 | 完成标准）
    const inline = splitLeadingDate(body)
    if (inline) {
      currentDate = inline.date
      if (inline.rest) {
        const t = splitTitleNotes(inline.rest)
        if (t.title) tasks.push({ date: currentDate, title: t.title, notes: t.notes })
      }
      continue
    }

    if (!currentDate) {
      errors.push(rawLine)
      continue
    }
    const t = splitTitleNotes(body)
    if (t.title) tasks.push({ date: currentDate, title: t.title, notes: t.notes })
    else errors.push(rawLine)
  }

  return { tasks, errors }
}

/** 若 body 以「日期 | 其余」开头，返回日期和其余部分 */
function splitLeadingDate(body: string): { date: string; rest: string } | null {
  const m = body.match(/^([^|｜:：]+)[|｜:：]\s*(.*)$/)
  if (!m) return null
  const date = normalizeDate(m[1])
  if (!date) return null
  return { date, rest: m[2] }
}

function splitTitleNotes(body: string): { title: string; notes: string } {
  // 优先按竖线分割
  const bar = body.search(/[|｜]/)
  if (bar >= 0) {
    return { title: body.slice(0, bar).trim(), notes: body.slice(bar + 1).trim() }
  }
  // 按「完成标准」标记分割
  const m = body.match(/^(.*?)[（(]?\s*完成标准[）):：]\s*(.*)$/)
  if (m) {
    return { title: m[1].trim(), notes: m[2].replace(/[）)]\s*$/, '').trim() }
  }
  return { title: body.trim(), notes: '' }
}

/** 把各种日期写法统一成 'YYYY-MM-DD'；无法识别返回 null */
export function normalizeDate(raw: string): string | null {
  let s = raw.trim()
  if (!s) return null
  // 去掉尾部括号备注：如「（周日）」「(周一)」
  s = s.replace(/[（(][^）)]*[）)]\s*$/, '').trim()
  // 去掉尾部「周X」
  s = s.replace(/\s*周[一二三四五六日天]\s*$/, '').trim()

  let m = s.match(/^(\d{4})\s*[-/.年]\s*(\d{1,2})\s*[-/.月]\s*(\d{1,2})\s*日?$/)
  if (m) return buildDate(Number(m[1]), Number(m[2]), Number(m[3]))

  m = s.match(/^(\d{1,2})\s*[-/.月]\s*(\d{1,2})\s*日?$/)
  if (m) {
    const year = new Date().getFullYear()
    return buildDate(year, Number(m[1]), Number(m[2]))
  }
  return null
}

function buildDate(y: number, mo: number, d: number): string | null {
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null
  const dt = new Date(y, mo - 1, d)
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

/** 复制给其他 AI 用的格式说明，贴进去就能让它按要求输出 */
export const IMPORT_TEMPLATE = `请把每天的计划按下面格式输出（一行一个任务，用竖线 | 分隔：日期 | 任务标题 | 完成标准）：

2026-09-13 | 读《C++ Primer》第 15 章 继承 | 完成标准：能说出虚函数与多态的关系
2026-09-13 | 墨墨背单词 50 个 | 完成标准：学完 50 新词
2026-09-14 | 读第 15 章 面向对象设计 | 完成标准：能画出继承层次图

日期格式用 YYYY-MM-DD；完成标准可以省略。只输出任务清单，不要输出其他解释。`
