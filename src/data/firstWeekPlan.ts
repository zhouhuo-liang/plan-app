import type { Category, Priority } from '../types'

/** 一段待导入的每日任务（标题 + 完成标准 + 归属日期） */
export interface PlanTaskSeed {
  date: string // 'YYYY-MM-DD'
  title: string
  notes: string // 完成标准
  priority: Priority
  category: Category
}

// 第一周（2026-09-06 周日 ~ 09-12 周六）：破冰期「C++ 回炉」第 1-7 天
// 主线：C++ Primer 第 6/7/9/12/13 章（拷贝控制与 Move 语义是重中之重）
// 支线：每天墨墨背单词 50 个 + GAMES101 每周 3 讲
// 每天 3-4h（上学期间，晚上 + 周末安排）
export const FIRST_WEEK_PLAN: PlanTaskSeed[] = [
  // ── 9/6 周日：启动日（装环境 + C++ 第 6 章）──
  {
    date: '2026-09-06',
    title: '安装 VS2022 + CMake，跑通 Hello World',
    notes: '完成标准：终端能输出 Hello World，说明编译链已打通（OpenGL 环境第 12 天再配，今天只装 C++ 工具）',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-06',
    title: '读《C++ Primer》第 6 章「函数」+ 纸笔笔记',
    notes: '完成标准：能脱稿说出函数传参（值 / 引用 / 指针）、const 形参、返回值的要点',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-06',
    title: '默写第 6 章代码（关书）',
    notes: '完成标准：独立写出「传参 / 返回值 / const 形参」的例子并编译通过',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-06',
    title: '墨墨背单词 50 个',
    notes: '完成标准：学完 50 个新词（明早先复习今天这批）',
    priority: 'medium',
    category: 'study',
  },
  {
    date: '2026-09-06',
    title: '一句话总结今天的 C++ 概念',
    notes: '完成标准：写下一条属于自己理解的话（不是抄书）',
    priority: 'low',
    category: 'study',
  },

  // ── 9/7 周一：第 7 章「类」──
  {
    date: '2026-09-07',
    title: '读《C++ Primer》第 7 章「类」，快速过（学校学过）',
    notes: '完成标准：能说出类的基本结构：数据成员、成员函数、构造函数、=default',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-07',
    title: '默写第 7 章例程',
    notes: '完成标准：独立写出一个带构造函数 / 类内初始值的类并编译通过',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-07',
    title: 'GAMES101 第 1 讲 + 笔记',
    notes: '完成标准：看完并写出 3 条笔记（图形学管线 / 变换概念）',
    priority: 'medium',
    category: 'study',
  },
  {
    date: '2026-09-07',
    title: '墨墨背单词 50 个',
    notes: '完成标准：学完 50 新词 + 复习昨天',
    priority: 'medium',
    category: 'study',
  },

  // ── 9/8 周二：第 9 章「顺序容器」──
  {
    date: '2026-09-08',
    title: '读《C++ Primer》第 9 章「顺序容器」',
    notes: '完成标准：能说出 vector / list / deque / string 的区别与各自常用场景',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-08',
    title: '默写容器常用操作',
    notes: '完成标准：独立写出 vector 的增删查改 + 迭代器遍历，编译通过',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-08',
    title: '墨墨背单词 50 个',
    notes: '完成标准：学完 50 新词 + 复习前两批',
    priority: 'medium',
    category: 'study',
  },

  // ── 9/9 周三：第 12 章「动态内存」（上）──
  {
    date: '2026-09-09',
    title: '读《C++ Primer》第 12 章 new/delete + shared_ptr / unique_ptr',
    notes: '完成标准：能解释 new/delete 与智能指针的区别、为什么优先用智能指针',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-09',
    title: '默写智能指针用法',
    notes: '完成标准：独立写出 make_shared / make_unique / reset / get 的例子并编译通过',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-09',
    title: '墨墨背单词 50 个',
    notes: '完成标准：学完 50 新词 + 复习',
    priority: 'medium',
    category: 'study',
  },

  // ── 9/10 周四：第 12 章「动态内存」（下）──
  {
    date: '2026-09-10',
    title: '读《C++ Primer》第 12 章 weak_ptr + 引用计数 / 控制块',
    notes: '完成标准：能解释 shared_ptr 的控制块何时销毁、weak_ptr 解决什么问题',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-10',
    title: '自测：智能指针小练习',
    notes: '完成标准：写一段代码让 shared_ptr / weak_ptr 观察同一对象，打印 use_count',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-10',
    title: 'GAMES101 第 2 讲 + 笔记',
    notes: '完成标准：看完并写出 3 条笔记',
    priority: 'medium',
    category: 'study',
  },
  {
    date: '2026-09-10',
    title: '墨墨背单词 50 个',
    notes: '完成标准：学完 50 新词 + 复习',
    priority: 'medium',
    category: 'study',
  },

  // ── 9/11 周五：第 13 章「拷贝控制」（上）⭐──
  {
    date: '2026-09-11',
    title: '读《C++ Primer》第 13 章 拷贝构造 / 拷贝赋值 / 析构（三/五法则）',
    notes: '完成标准：能说出「三/五法则」是什么、什么时候需要自定义',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-11',
    title: '默写拷贝控制例子',
    notes: '完成标准：写一个管理资源的类，实现拷贝构造 / 拷贝赋值 / 析构，编译通过且不泄漏',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-11',
    title: '墨墨背单词 50 个',
    notes: '完成标准：学完 50 新词 + 复习',
    priority: 'medium',
    category: 'study',
  },

  // ── 9/12 周六：第 13 章「移动语义」（下）⭐⭐ + 周复盘 ──
  {
    date: '2026-09-12',
    title: '读《C++ Primer》第 13 章 移动构造 / std::move / 右值引用',
    notes: '完成标准：能解释右值引用与 std::move 的作用',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-12',
    title: '自测：移动语义验证',
    notes: '完成标准：写一个类让拷贝和移动打印不同的话，验证 std::move 生效',
    priority: 'high',
    category: 'study',
  },
  {
    date: '2026-09-12',
    title: 'GAMES101 第 3 讲 + 笔记',
    notes: '完成标准：看完并写出 3 条笔记（本周共 3 讲，达标）',
    priority: 'medium',
    category: 'study',
  },
  {
    date: '2026-09-12',
    title: '墨墨背单词 50 个 + 本周复习',
    notes: '完成标准：复习本周约 300 词，标记忘记的',
    priority: 'medium',
    category: 'study',
  },
  {
    date: '2026-09-12',
    title: '周复盘：回看第 12 / 13 章',
    notes: '完成标准：确认 RAII、拷贝控制、Move 语义都理解，记下仍卡壳的点',
    priority: 'low',
    category: 'study',
  },
]

/** 把第一周计划渲染成「日期 | 标题 | 完成标准」的文本，供导入弹窗作为示例一键载入 */
export function firstWeekPlanText(): string {
  return FIRST_WEEK_PLAN.map((t) => `${t.date} | ${t.title} | ${t.notes}`).join('\n')
}
