export interface Tutor {
  name: string
  title: string
  direction: string
  fit: string
}

export interface TutorTier {
  tier: 'first' | 'second'
  label: string
  note: string
  tutors: Tutor[]
}

export const TUTOR_TIERS: TutorTier[] = [
  {
    tier: 'first',
    label: '第一梯队：你的主战场（图形学）',
    note: '统考名额每年约 3-5 个，你的渲染器项目直接命中',
    tutors: [
      { name: '李桂清', title: '教授/博导', direction: '数字几何处理、三维重建、可视分析、3D动画', fit: '★★★★★' },
      { name: '冼楚华', title: '副教授/硕导', direction: '计算机图形学、三维视觉、智能几何计算、VR', fit: '★★★★★' },
      { name: '毛爱华', title: '教授/博导', direction: 'VR、可视化、三维点云、具身智能', fit: '★★★★★' },
      { name: '聂勇伟', title: '副教授/博导', direction: '图形学+视觉交叉、视频理解、SIGGRAPH 常客', fit: '★★★★★' },
      { name: '张见威', title: '副教授/硕导', direction: '图像处理、深度学习、计算机视觉', fit: '★★★' },
    ],
  },
  {
    tier: 'second',
    label: '第二梯队：退路方向（渲染能力有迁移性）',
    note: '图形学名额满了就转向这里',
    tutors: [
      { name: '视听觉与服务计算', title: '许勇(副校长)/博导', direction: '计算机视觉、模式识别、智慧城市', fit: '★★★' },
      { name: '智能技术与机器人', title: '杜广龙/博导', direction: '智能机器人、人机交互、自动驾驶仿真', fit: '★★★' },
      { name: '高性能计算', title: '董守斌、林伟伟/博导', direction: 'GPU 架构理解可迁移，你懂 Compute Shader', fit: '★★' },
      { name: '机器学习与数据挖掘', title: '吴永贤、何克晶/博导', direction: '做了神经渲染项目就有切入点', fit: '★★' },
    ],
  },
]

export const DUAL_SELECT_FLOW: string[] = [
  '初试成绩 → 进复试线 → 复试（机试 50 + 英语 10 + 综合面试 40）',
  '复试合格 + 排名在招生计划内 → 进入「双向选择名单」（只是入场券，不是录取）',
  '1-2 天内自己找导师签字 → 导师同意接收 → 拟录取',
]

export const DUAL_SELECT_WARNING =
  '「在规定时间内经双向选择无法找到接收导师的学生，原则上不予录取。」复试过了、排名够了，但没导师要你，照样走人。'

export const INTERVIEW_SCORE = '复试成绩 = 机试 50 + 英语 10 + 综合面试 40，总分 100，低于 60 直接淘汰。双选才是真正的录取线。'

export const CONTACT_TIMELINE: { time: string; action: string }[] = [
  { time: '大三上学期', action: '确定 3-4 个目标导师，读论文了解方向' },
  { time: '初试结束后', action: '估分；若 >370 准备联系材料（简历 + GitHub + 截图）' },
  { time: '出分当天', action: '立刻发邮件给 3 个导师，附简历 + GitHub + 渲染器截图' },
  { time: '出分后 1 周内', action: '不回复再发一次；「名额已满」立刻转备选' },
  { time: '复试前', action: '锁定至少一个正面回复的导师' },
  { time: '双选当天', action: '直接找已联系好的导师签字' },
]

export const EMAIL_TEMPLATE = {
  subject: '2029级研究生自荐 - [姓名] - [本科学校] - 初试[X]分',
  body: [
    '自我介绍（学校、专业、初试分数）',
    '为什么对图形学感兴趣，为什么选华工',
    '你的图形学项目简介（最硬核的部分）',
    '附上 GitHub 链接 + 技术博客链接',
    '表达读研意愿',
  ],
}
