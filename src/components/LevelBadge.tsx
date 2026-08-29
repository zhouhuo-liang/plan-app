import { useApp } from '../store/AppContext'

/** 侧边栏的总完成次数卡片 */
function LevelBadge() {
  const { completions } = useApp()
  const total = completions.length

  return (
    <div className="level-card">
      <div className="level-head">
        <span className="level-points">🎯 总共完成任务</span>
        <span className="level-count">{total} 次</span>
      </div>
    </div>
  )
}

export default LevelBadge
