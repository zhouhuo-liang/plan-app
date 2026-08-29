export interface Plan {
  id: string
  name: string
  subtitle: string
  icon: string
}

// 「我的计划」列表。目前只有一个图形学考研计划；
// 以后加健身、饮食等计划，只需在这里新增一条，再补一个对应的详情视图即可。
export const PLANS: Plan[] = [
  { id: 'graphics', name: '图形学考研规划', subtitle: '华工 · 计算机图形学', icon: '🖥️' },
]
