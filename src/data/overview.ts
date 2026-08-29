export interface ExamSubject {
  subject: string
  full: number
  target: string
  note: string
}

export const EXAM_SUBJECTS: ExamSubject[] = [
  { subject: '政治', full: 100, target: '70+', note: '9月开始，不早不晚' },
  { subject: '英语一', full: 100, target: '75+', note: '从现在开始背单词' },
  { subject: '数学一', full: 150, target: '120+', note: '最关键的一门，拉分项' },
  { subject: '408 专业课', full: 150, target: '115+', note: '四门硬课，早开始' },
  { subject: '总分', full: 500, target: '380+', note: '华工近年复试线参考 340-360' },
]

export const WHY_HUST: string[] = [
  '985，广州，计算机学科评估 A-，粤港澳大湾区地理位置优势',
  'CS 学院有虚拟现实 / 可视化 / 图形学相关实验室',
  '考 408 统考，信息公开透明，不歧视双非（复试看能力而非出身）',
  '408 是硬仗，但也意味着公平 —— 分数说话',
]

export const STRATEGY: { phase: string; action: string }[] = [
  { phase: '大二', action: '狂堆图形学能力（渲染器 + GitHub + 博客）→ 复试武器' },
  { phase: '大三上', action: '图形学收尾 + 408 启动' },
  { phase: '大三下', action: '408 系统复习 + 数学一' },
  { phase: '大三暑假', action: '全职备考（数学一 + 408 真题）' },
  { phase: '大四上', action: '冲刺 + 12月初试' },
  { phase: '大四下', action: '复试准备 + 联系导师 + 面试' },
]

export const STRATEGY_CORE =
  '初试决定你能不能进门，复试决定你能不能留下。双非学生初试至少要高出复试线 20-30 分，复试用图形学项目碾压。'

export const SUMMARY_TIMELINE: { time: string; event: string }[] = [
  { time: '2026 大二上（9月启动）', event: 'GAMES101 + OpenGL 入门 → 破冰 + 双线启动 + 408-DS' },
  { time: '2027 大二下', event: 'Vulkan 深入 + GPU-Driven → 图形学成型 + 408-计组/OS' },
  { time: '2027 大二暑假', event: '图形学收尾 + UE5 体验 → 分水岭，全面转向考研' },
  { time: '2028 大三上', event: '项目冻结 + 联系导师认知 → 产出完成，确定目标导师' },
  { time: '2028 大三下', event: '考研强化期 → 每天 8h+，最重要学期' },
  { time: '2028 大三暑假', event: '考研黄金 60 天 → 每天 10h+，决定成败' },
  { time: '2028 大四上', event: '冲刺 + 12月初试 → 最后一搏' },
  { time: '2029 初试后', event: '出分当天发邮件给导师 → 双选前置工作' },
  { time: '2029 大四下', event: '复试 + 双选签字 → 上岸' },
]

export const CORE_PRINCIPLES: string[] = [
  '大二暑假之前，完成一个完整的 Vulkan 渲染器。之后封存项目，全面转向考研。',
  '数学一和 408 没有捷径，就是时间堆出来的。大三下学期往后，每天至少 8h。',
  '初试分数是一切的前提。分不够，渲染器写得再好也进不了复试。',
  '图形学是主攻，但不是唯一出口。客户端开发、TA、视觉/VR 方向多条路可走。',
  '复试双选的战场不在见面会那天，在你出分当天发出的那封邮件里。',
]
