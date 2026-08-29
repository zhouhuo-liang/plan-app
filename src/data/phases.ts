export interface Phase {
  id: string
  title: string
  period: string
  tagline: string
  start: string // YYYY-MM
  end: string // YYYY-MM
  focus: string
  items: { title: string; desc?: string }[]
}

// 规划从 2026-09-06 启动：已过期的「大一暑假破冰期」已合并进「大二上」，
// 从大二寒假起保持原时间线不变，初试固定在 2028-12。
export const PHASES: Phase[] = [
  {
    id: 'sem-y2a',
    title: '大二上学期',
    period: '2026年9月6日 - 2027年1月',
    tagline: '破冰 + 双线启动',
    start: '2026-09',
    end: '2027-01',
    focus: '图形学破冰入门 + 学校课程 85+，双线并进',
    items: [
      { title: '学校课程 85+', desc: '数据结构 / 线性代数 / 高等数学，代码题动手写' },
      { title: 'C++ 回炉精简', desc: '拷贝控制 / Move 语义 / 智能指针，1-2 周，配合课程' },
      { title: 'GAMES101（闫令琪）', desc: '每周 2-3 讲，至少做作业 1-5，配合 OpenGL 实践' },
      { title: 'OpenGL 入门 → 进阶', desc: '三角形 → Blinn-Phong → 模型加载 → UBO/SSBO + Shadow' },
      { title: '408 预热', desc: '王道数据结构代码题，跟学校 DS 课同步' },
      { title: '英语单词第一轮', desc: '每天 50 词，大二上结束背完第一轮考研词汇' },
      { title: 'GitHub 仓库 + 第一篇博客', desc: 'README 带截图/GIF，每个功能独立 commit' },
    ],
  },
  {
    id: 'winter-y2',
    title: '大二寒假',
    period: '2027年2月',
    tagline: '快速进阶',
    start: '2027-02',
    end: '2027-02',
    focus: 'Vulkan 入门 + GAMES202 + 输出第一篇博客',
    items: [
      { title: 'Vulkan 入门', desc: 'vulkan-tutorial 画三角形 → 纹理映射 + 深度缓冲' },
      { title: 'Vulkan 实现 PBR + Shadow Mapping', desc: '含 Cascaded Shadow Maps' },
      { title: 'GAMES202 + DLSS 认知', desc: '了解 DLSS/FSR 原理（超分 + 帧生成 + 神经降噪）' },
      { title: '读《Real-Time Rendering》第 5-7 章' },
      { title: '王道数据结构选择题刷完一遍' },
      { title: '输出第一篇技术文章（我是怎么写 OpenGL 渲染器的）' },
    ],
  },
  {
    id: 'sem-y2b',
    title: '大二下学期',
    period: '2027年2月 - 7月',
    tagline: '图形学冲刺 + 408 启动',
    start: '2027-03',
    end: '2027-06',
    focus: '图形学能力成型的关键学期，也是 408 正式学习的起点',
    items: [
      { title: '学校课程 85+', desc: '计算机组成原理 / 操作系统，跟王道网课同步' },
      { title: 'Vulkan 进阶', desc: 'Descriptor Set 管理、Pipeline Cache、多线程 Command Buffer' },
      { title: 'GPU-Driven Rendering', desc: 'GPU Culling + Indirect Draw + 尝试 Mesh Shader' },
      { title: '读《RTR》19-20 章 + 23 章', desc: 'GPU 架构' },
      { title: '神经渲染综述', desc: '建立概念认知' },
      { title: '408 学习', desc: '数据结构大题二刷 + 计组跟一遍' },
      { title: '英语', desc: '单词第二轮 + 真题阅读每周 2 篇' },
    ],
  },
  {
    id: 'summer-y2',
    title: '大二暑假',
    period: '2027年7月 - 8月',
    tagline: '图形学收尾 + 408 集中推进',
    start: '2027-07',
    end: '2027-08',
    focus: '黄金时间，不用上课，全力冲刺',
    items: [
      { title: 'Vulkan 加 Ray Tracing', desc: 'VK_KHR_ray_tracing 做简单 Path Tracer' },
      { title: 'GAMES104 + UE5', desc: '游戏引擎架构 + 用 UE5 做一个简单场景' },
      { title: '了解 NeRF / 3DGS', desc: '知道和传统渲染的区别即可' },
      { title: '整理 GitHub', desc: '两个渲染器 README 写漂亮（中英双语）' },
      { title: '深度技术博客', desc: '「从零实现 Vulkan 渲染器」系列' },
      { title: '408 + 数学一启动', desc: '计组完整过一遍 + 高数基础班' },
    ],
  },
  {
    id: 'sem-y3a',
    title: '大三上学期',
    period: '2027年9月 - 2028年1月',
    tagline: '图形学最后产出 + 考研基础期',
    start: '2027-09',
    end: '2028-01',
    focus: '图形学项目最后的收尾窗口，之后全面转向考研',
    items: [
      { title: '学校课程 85+', desc: '计算机网络 / 概率论与数理统计' },
      { title: '选方向深入', desc: 'DDGI 或 TAA，读 3-5 篇论文' },
      { title: '产出第三个 GitHub 项目', desc: 'GI Demo / 神经降噪 / 性能分析 / Mini Engine 四选一' },
      { title: '图形学项目冻结', desc: '此后仅维护，不再加新功能' },
      { title: '考研基础', desc: '数学一基础班 + 408 四门过一遍 + 英语真题每周 4 篇' },
    ],
  },
  {
    id: 'winter-y3',
    title: '大三寒假',
    period: '2028年2月',
    tagline: '考研强化期开始',
    start: '2028-02',
    end: '2028-02',
    focus: '每天 8h+，全面进入考研状态',
    items: [
      { title: '数学一强化班', desc: '张宇 18讲 + 线代9讲 + 概率9讲 + 配套习题' },
      { title: '408 二刷', desc: '王道四本书，选择题全做，大题做 50%' },
      { title: '英语', desc: '阅读每天 1-2 篇精做' },
    ],
  },
  {
    id: 'sem-y3b',
    title: '大三下学期',
    period: '2028年2月 - 7月',
    tagline: '考研强化期',
    start: '2028-03',
    end: '2028-06',
    focus: '整个考研周期最累的阶段，也是拉分关键',
    items: [
      { title: '数学一', desc: '强化班全部完成 + 1000题/660题刷完第一遍' },
      { title: '408', desc: '王道四本书二刷 + 大题全部做完' },
      { title: '英语', desc: '真题阅读第一遍（近15年）+ 完形/新题型开始' },
      { title: '政治', desc: '8 月开始，听徐涛强化班' },
    ],
  },
  {
    id: 'summer-y3',
    title: '大三暑假',
    period: '2028年7月 - 8月',
    tagline: '考研冲刺期（黄金 60 天）',
    start: '2028-07',
    end: '2028-08',
    focus: '决定能不能考上的 60 天，每天 10h+',
    items: [
      { title: '数学一真题套卷', desc: '近 20 年，两天一套，目标均分 120+' },
      { title: '408 真题 + 大题专项', desc: '计组 CPU 执行流程 / 数据结构算法设计 / OS 的 PV / 计网拓扑' },
      { title: '英语', desc: '阅读二刷 + 作文模板整理' },
      { title: '政治', desc: '徐涛强化班 + 1000题第一遍，选择正确率 >70%' },
    ],
  },
  {
    id: 'sem-y4a',
    title: '大四上学期',
    period: '2028年9月 - 12月',
    tagline: '最后冲刺',
    start: '2028-09',
    end: '2028-12',
    focus: '最后一搏，12月初试',
    items: [
      { title: '9-10月', desc: '真题二刷 + 模拟卷（张宇8套/李林6套）' },
      { title: '11月', desc: '模拟卷 + 回归基础 + 错题回顾' },
      { title: '12月（考前3周）', desc: '错题回顾 + 肖四背大题' },
      { title: '初试（预估12月23-24日）', desc: '政治 → 英语一 → 数学一 → 408' },
    ],
  },
  {
    id: 'retest',
    title: '初试后 → 复试',
    period: '2029年1月 - 3月',
    tagline: '复试 + 双选',
    start: '2029-01',
    end: '2029-03',
    focus: '图形学项目的变现时刻',
    items: [
      { title: '初试后立刻估分', desc: '>370 全力复试；350-370 复试+调剂；<350 全力调剂' },
      { title: '复试准备', desc: '刷 GitHub 项目 / PPT 介绍 / 手写 Shader / 英语口语' },
      { title: '出分当天发邮件', desc: '附简历 + GitHub + 渲染器截图，每个导师提你读过他的论文' },
      { title: '双选签字', desc: '直接找已联系好的导师，当天搞定' },
    ],
  },
]
