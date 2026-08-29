import { useState } from 'react'
import { PLANS } from './data/plans'
import PlanView from './components/PlanView'
import TodayView from './components/TodayView'
import HabitsView from './components/HabitsView'
import FocusView from './components/FocusView'
import StatsView from './components/StatsView'
import LevelBadge from './components/LevelBadge'

type ToolTab = 'today' | 'habits' | 'focus' | 'stats'
type Tab = 'plan' | ToolTab

const TOOLS: { key: ToolTab; label: string; icon: string }[] = [
  { key: 'today', label: '今日', icon: '📅' },
  { key: 'habits', label: '习惯', icon: '🔁' },
  { key: 'focus', label: '专注', icon: '⏱️' },
  { key: 'stats', label: '统计', icon: '📊' },
]

function App() {
  const [tab, setTab] = useState<Tab>('today')
  const [activePlanId, setActivePlanId] = useState(PLANS[0].id)

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">🧭</span>
          <div>
            <div className="sidebar-title">我的规划</div>
            <div className="sidebar-sub">计划 · 专注 · 打卡</div>
          </div>
        </div>

        <LevelBadge />

        <nav className="nav">
          <div className="nav-group">
            <div className="nav-group-label">工具</div>
            {TOOLS.map((tool) => (
              <button
                key={tool.key}
                type="button"
                className={tab === tool.key ? 'nav-item active' : 'nav-item'}
                onClick={() => setTab(tool.key)}
              >
                <span className="nav-icon">{tool.icon}</span>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>

          <div className="nav-group">
            <div className="nav-group-label">我的计划</div>
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className={tab === 'plan' && activePlanId === plan.id ? 'nav-item active' : 'nav-item'}
                onClick={() => {
                  setActivePlanId(plan.id)
                  setTab('plan')
                }}
              >
                <span className="nav-icon">{plan.icon}</span>
                <span>{plan.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      <main className="main">
        {tab === 'plan' && <PlanView planId={activePlanId} />}
        {tab === 'today' && <TodayView />}
        {tab === 'habits' && <HabitsView />}
        {tab === 'focus' && <FocusView />}
        {tab === 'stats' && <StatsView />}
      </main>
    </div>
  )
}

export default App
