export interface Career {
  name: string
  tier: 'first' | 'second' | 'third'
  fit: string
  advantage: string
  lack: string
  salary: string
  note: string
}

export const TIER_LABELS: Record<Career['tier'], string> = {
  first: '第一档：无缝衔接',
  second: '第二档：高度迁移',
  third: '第三档：C++ 跨行变现',
}

export const CAREERS: Career[] = [
  {
    name: '游戏客户端开发',
    tier: 'first',
    fit: '★★★★★',
    advantage: '渲染器直接覆盖客户端最核心的知识盲区，懂底层渲染的极少',
    lack: 'Unity/UE 编辑器熟练度、网络同步、Lua 脚本',
    salary: '10K–20K，3 年 20K–35K',
    note: '最顺滑的切出方向，渲染器所有积累全能用上',
  },
  {
    name: 'TA（技术美术）程序向',
    tier: 'first',
    fit: '★★★★★',
    advantage: 'Shader 是你的舒适区，PBR/渲染管线理解远超大多数 TA',
    lack: 'Maya/Blender/Houdini、美术资产管线概念',
    salary: '12K–25K，3 年 25K–45K',
    note: '程序向 TA 稀缺到公司跪求，学一个月 Blender 即合格',
  },
  {
    name: '自动驾驶仿真引擎开发',
    tier: 'second',
    fit: '★★★★',
    advantage: '仿真引擎底层和游戏引擎一模一样，场景渲染/传感器模拟全在路线图里',
    lack: 'ROS/ROS2、传感器模型、SLAM 概念',
    salary: '18K–30K，3 年 30K–50K',
    note: '广州在自动驾驶产业带上，方向+地点双重契合',
  },
  {
    name: 'GPU 计算 / CUDA 开发',
    tier: 'second',
    fit: '★★★★',
    advantage: 'Compute Shader 思维和 CUDA 同构，GPU 架构理解是硬通货',
    lack: 'CUDA C++ 语法、常用并行算法（规约/扫描/排序）',
    salary: '20K–35K，3 年 35K–60K',
    note: '学了 Compute Shader 转 CUDA 只需两周',
  },
  {
    name: '数字孪生 / GIS 三维引擎开发',
    tier: 'second',
    fit: '★★★',
    advantage: '大规模地形渲染、空间索引、LOD 都有概念基础',
    lack: 'OSG/Cesium、GIS 数据格式（3D Tiles、glTF）',
    salary: '10K–18K，3 年 18K–30K',
    note: '技术栈偏老，年轻人有降维打击效应，稳定加班少',
  },
  {
    name: 'XR / VR / AR 引擎开发',
    tier: 'second',
    fit: '★★★',
    advantage: 'ATW/ASW/注视点渲染/空间锚点是路线图底层直接延伸',
    lack: 'OpenXR、空间计算、手部追踪、SLAM',
    salary: '15K–25K，3 年 25K–45K',
    note: '赌一个 Vision Pro 时刻，赌对就是最早入场',
  },
  {
    name: '影视/动画渲染流程开发',
    tier: 'second',
    fit: '★★★',
    advantage: '离线渲染/PBR/光追跟项目几乎一条线',
    lack: '渲染农场调度、OpenColorIO/OpenEXR、USD',
    salary: '10K–18K，3 年 18K–30K',
    note: '对电影级画面有执念的人的出口',
  },
  {
    name: '量化金融 C++ 开发',
    tier: 'third',
    fit: '★★★',
    advantage: 'C++ 极致性能优化、低延迟系统，调帧预算思维完全可迁移',
    lack: '金融知识（零基础痛苦）、FIX 协议、交易所接口',
    salary: '25K–50K，天花板极高',
    note: '纯靠 C++ 能力跨行变现，关心纳秒级延迟',
  },
  {
    name: 'AI 推理引擎 / ML 框架开发',
    tier: 'third',
    fit: '★★',
    advantage: 'GPU 算力调度、CUDA kernel 优化跟 GPU 知识接壤',
    lack: 'PyTorch/TF 源码级理解、Transformer/CV/NLP 模型结构',
    salary: '25K–40K，3 年 40K–70K',
    note: '不是卷 AI 算法，是给 AI 框架写底层算子',
  },
  {
    name: '高性能 C++ 系统开发',
    tier: 'third',
    fit: '★★',
    advantage: 'C++ 是路线图培养的最通用资产，内存/多线程/性能分析处处值钱',
    lack: '数据库内核、浏览器引擎、音视频、嵌入式、OS',
    salary: '视具体方向差异大',
    note: '兜底选项——C++ 能力是能带走的最硬通货',
  },
]

export const CAREER_SUMMARY = '最稳：客户端开发 · 最赚：GPU/CUDA · 最酷：自动驾驶仿真。共同特征：不需要重学底层能力，只需加一层领域知识。'
