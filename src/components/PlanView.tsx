import { useState } from 'react'
import { PLANS } from '../data/plans'
import OverviewView from './OverviewView'
import PhasesView from './PhasesView'
import SubjectsView from './SubjectsView'
import InterviewView from './InterviewView'
import CareersView from './CareersView'
import ResourcesView from './ResourcesView'

type SubKey = 'overview' | 'phases' | 'subjects' | 'interview' | 'careers' | 'resources'

const SUB_TABS: { key: SubKey; label: string }[] = [
  { key: 'overview', label: '总览' },
  { key: 'phases', label: '阶段路线' },
  { key: 'subjects', label: '408 · 数学' },
  { key: 'interview', label: '复试 · 导师' },
  { key: 'careers', label: '职业方向' },
  { key: 'resources', label: '资源库' },
]

function PlanView({ planId }: { planId: string }) {
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0]
  const [sub, setSub] = useState<SubKey>('overview')

  return (
    <section>
      <div className="plan-head">
        <span className="plan-head-icon">{plan.icon}</span>
        <div>
          <h2 className="plan-head-title">{plan.name}</h2>
          <p className="plan-head-sub">{plan.subtitle}</p>
        </div>
      </div>

      <div className="sub-tabs">
        {SUB_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={sub === t.key ? 'sub-tab active' : 'sub-tab'}
            onClick={() => setSub(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sub === 'overview' && <OverviewView />}
      {sub === 'phases' && <PhasesView />}
      {sub === 'subjects' && <SubjectsView />}
      {sub === 'interview' && <InterviewView />}
      {sub === 'careers' && <CareersView />}
      {sub === 'resources' && <ResourcesView />}
    </section>
  )
}

export default PlanView
