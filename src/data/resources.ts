export interface Resource {
  type: string
  name: string
  note: string
  url?: string
}

export const GRAPHICS_RESOURCES: Resource[] = [
  { type: '网站', name: 'learnopengl.com', note: 'OpenGL 入门必读，大一暑假完成', url: 'https://learnopengl.com' },
  { type: '网站', name: 'vulkan-tutorial.com', note: 'Vulkan 入门，大二上开始', url: 'https://vulkan-tutorial.com' },
  { type: '网站', name: 'Shadertoy', note: '在线 Shader 练习，每周练手', url: 'https://www.shadertoy.com' },
  { type: '网站', name: 'RealtimeRendering.com', note: 'RTR 书配套资源，论文/PPT/博客索引', url: 'https://www.realtimerendering.com' },
  { type: '课程', name: 'GAMES101', note: '图形学入门（闫令琪），大一暑假跟' },
  { type: '课程', name: 'GAMES202', note: '实时高质量渲染，大二上/下跟' },
  { type: '课程', name: 'GAMES104', note: '游戏引擎架构，大二暑假跟' },
  { type: '书', name: 'Real-Time Rendering 4th', note: '实时渲染圣经，工具书式查阅' },
  { type: '书', name: 'PBRT v4', note: '离线渲染圣经（免费在线阅读）' },
  { type: '书', name: 'Ray Tracing Gems I & II', note: '光追实战技术合集' },
  { type: '书', name: 'GPU Zen / GPU Pro', note: 'GPU 编程实战' },
  { type: '工具', name: 'RenderDoc', note: 'GPU 帧调试，截帧分析' },
  { type: '工具', name: 'Nsight Graphics', note: 'GPU 性能分析（需 NVIDIA 显卡）' },
  { type: '引擎', name: 'Filament', note: 'Android 开源 PBR 渲染器，学工业级架构' },
  { type: '引擎', name: 'Piccolo', note: 'GAMES104 配套迷你引擎' },
  { type: '代码库', name: 'The-Forge', note: '跨 API 渲染框架（Vulkan/DX12/Metal）' },
  { type: '代码库', name: 'Sascha Willems Vulkan Examples', note: 'Vulkan 各特性独立示例' },
]

export const KAOYAN_RESOURCES: Resource[] = [
  { type: '数学一', name: '张宇《高数18讲》+《线代9讲》+《概率9讲》', note: '强化必备' },
  { type: '数学一', name: '《张宇1000题》或《李林880题》', note: '刷题' },
  { type: '数学一', name: '真题（近20年）+ 模拟卷', note: '后期' },
  { type: '408', name: '王道考研四本书', note: '最重要，反复刷' },
  { type: '408', name: '天勤高分笔记', note: '数据结构部分更好' },
  { type: '408', name: '王道真题 + 模拟卷', note: '后期' },
  { type: '英语', name: '《考研真相》（基础弱）/《黄皮书》（基础好）', note: '真题' },
  { type: '英语', name: '墨墨背单词 / 不背单词 App', note: '每天' },
  { type: '政治', name: '肖秀荣《精讲精练》+《1000题》+《肖四》《肖八》', note: '信肖老' },
  { type: '政治', name: '徐涛强化班（网课）', note: '听课' },
]

export const CONFERENCES: { abbr: string; full: string; level: string }[] = [
  { abbr: 'SIGGRAPH', full: 'ACM SIGGRAPH（每年8月，北美）', level: '顶会' },
  { abbr: 'SIGGRAPH Asia', full: 'SIGGRAPH 亚洲分会（每年12月）', level: '顶会' },
  { abbr: 'Eurographics', full: 'EG（每年5月，欧洲）', level: '顶会' },
  { abbr: 'TOG', full: 'ACM Transactions on Graphics', level: '顶刊' },
  { abbr: 'CGF', full: 'Computer Graphics Forum', level: '顶刊' },
  { abbr: 'I3D', full: 'Interactive 3D Graphics', level: '实时渲染顶级' },
  { abbr: 'HPG', full: 'High-Performance Graphics', level: 'GPU/实时' },
  { abbr: 'GDC', full: 'Game Developers Conference', level: '工业界' },
  { abbr: 'JCGT', full: 'Journal of Computer Graphics Techniques', level: '开源期刊' },
]
