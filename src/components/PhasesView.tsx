import { useApp } from '../store/AppContext'
import { PHASES } from '../data/phases'
import { todayStr } from '../lib/date'

function PhasesView() {
  const { checkedMilestones, toggleMilestone } = useApp()
  const currentMonth = todayStr().slice(0, 7)

  const total = PHASES.reduce((sum, p) => sum + p.items.length, 0)
  const done = PHASES.reduce(
    (sum, p) => sum + p.items.filter((_, i) => checkedMilestones.includes(`${p.id}-${i}`)).length,
    0,
  )
  const overallPercent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <section>
      <h2 className="page-title">阶段路线</h2>

      <div className="card progress-card">
        <div className="progress-card-head">
          <span>总体进度</span>
          <span>
            {done} / {total} 项（{overallPercent}%）
          </span>
        </div>
        <div className="progress">
          <div className="progress-bar" style={{ width: `${overallPercent}%` }} />
        </div>
      </div>

      <div className="phase-list">
        {PHASES.map((phase) => {
          const current = phase.start <= currentMonth && currentMonth <= phase.end
          const phaseDone = phase.items.filter((_, i) =>
            checkedMilestones.includes(`${phase.id}-${i}`),
          ).length
          const percent = phase.items.length === 0 ? 0 : Math.round((phaseDone / phase.items.length) * 100)

          return (
            <div className={current ? 'phase-card current' : 'phase-card'} key={phase.id}>
              <div className="phase-header">
                <div className="phase-title-row">
                  <h3 className="phase-title">{phase.title}</h3>
                  {current && <span className="current-badge">当前阶段</span>}
                </div>
                <div className="phase-meta">
                  <span className="phase-period">{phase.period}</span>
                  <span className="phase-tagline">{phase.tagline}</span>
                </div>
                <p className="phase-focus">🎯 {phase.focus}</p>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${percent}%` }} />
                </div>
              </div>

              <ul className="milestone-list">
                {phase.items.map((item, i) => {
                  const id = `${phase.id}-${i}`
                  const checked = checkedMilestones.includes(id)
                  return (
                    <li className={checked ? 'milestone done' : 'milestone'} key={id}>
                      <label className="task-check">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleMilestone(id)}
                        />
                        <span className="task-checkbox" aria-hidden="true" />
                      </label>
                      <div className="milestone-body">
                        <span className="milestone-title">{item.title}</span>
                        {item.desc && <span className="milestone-desc">{item.desc}</span>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PhasesView
