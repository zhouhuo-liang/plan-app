export interface Course {
  name: string
  essence: string
  difficulty: string
  trait: string
  methods: string[]
}

export const CS408: Course[] = [
  {
    name: '数据结构',
    essence: '工具箱',
    difficulty: '★★★',
    trait: '理解了不需要死背，不理解背了也没用',
    methods: [
      '做题比看书重要十倍',
      '代码题闭卷默写：线性表 → 二叉树递归 → 图遍历/最短路径',
      '排序算法不要求全手写，但过程必须能手动画出来',
    ],
  },
  {
    name: '计算机组成原理',
    essence: '硬骨头',
    difficulty: '★★★★★',
    trait: '408 最难。概念抽象、横跨软硬件、知识密度极大',
    methods: [
      '两遍法：第一遍逐章理解，第二遍跨章节串联',
      '最重的题在 CPU 和存储器交叉处',
      '大题：给定 C 代码，画它变成指令后 CPU 怎么一步步执行',
    ],
  },
  {
    name: '操作系统',
    essence: '中间人',
    difficulty: '★★★★',
    trait: '概念多但有逻辑链，抓住主线就不会散',
    methods: [
      '抓主线：进程 → 内存 → 文件 → IO',
      'PV 操作题刷完王道所有题',
      '不要看文字解释，直接做题，做完再看解析',
    ],
  },
  {
    name: '计算机网络',
    essence: '规矩本',
    difficulty: '★★★',
    trait: '最好学。背协议 + 算小题，没有深层抽象',
    methods: [
      '1.5 倍速过网课，立刻刷选择',
      '选择正确率 >85% 后回头查漏补缺',
      '重点三块：TCP 拥塞控制 / IP 子网划分 / 应用层协议',
    ],
  },
]

export const CS408_ORDER = '必须按此顺序学：DS → 计组 → OS → 计网。DS 是工具必须先会；计组和 OS 有交叉点（虚拟内存），放相邻时间学。'

export const CS408_METHOD = '学完一章后，不看书白纸画思维导图。残缺处 = 没学会的地方，回去补，再画一遍直到完整。对计组和 OS 尤其有用。'

export interface MathPart {
  part: string
  ratio: string
  difficulty: string
  mistake: string
  method: string
}

export const MATH_PARTS: MathPart[] = [
  {
    part: '高数',
    ratio: '~60%',
    difficulty: '多元微积分、级数',
    mistake: '计算能力不足，知道怎么做但算不出来',
    method: '做题量 > 听课量，李林 880',
  },
  {
    part: '线性代数',
    ratio: '~20%',
    difficulty: '概念抽象、逻辑链长',
    mistake: '靠背题型，换个形式就不认识',
    method: '先看 3Blue1Brown 理解线性变换本质',
  },
  {
    part: '概率论',
    ratio: '~20%',
    difficulty: '公式多、分布多',
    mistake: '概念混淆，不知何时用哪个分布',
    method: '按「公式用在哪里」分类背',
  },
]

export const MATH_NOTE = '数学一最关键的不是听什么课——是做了多少题。120 分是刷出来的。'
