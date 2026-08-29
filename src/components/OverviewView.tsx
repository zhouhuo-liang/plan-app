import {
  EXAM_SUBJECTS,
  WHY_HUST,
  STRATEGY,
  STRATEGY_CORE,
  SUMMARY_TIMELINE,
  CORE_PRINCIPLES,
} from '../data/overview'
import CountdownCard from './CountdownCard'

function OverviewView() {
  return (
    <section>
      <CountdownCard />
      <div className="hero card">
        <h2 className="hero-title">图形渲染工程师 · 考研规划</h2>
        <p className="hero-sub">目标：华南理工大学 计算机/软件 研究生 · 方向计算机图形学</p>
        <p className="hero-strategy">{STRATEGY_CORE}</p>
      </div>

      <h3 className="section-title">为什么是华南理工</h3>
      <div className="card">
        <ul className="plain-list">
          {WHY_HUST.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>

      <h3 className="section-title">顶层策略</h3>
      <div className="card">
        <div className="strategy-steps">
          {STRATEGY.map((s, i) => (
            <div className="strategy-step" key={s.phase}>
              <span className="strategy-index">{i + 1}</span>
              <div>
                <div className="strategy-phase">{s.phase}</div>
                <div className="strategy-action">{s.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="section-title">考试科目总览</h3>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>科目</th>
              <th>满分</th>
              <th>目标分数</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {EXAM_SUBJECTS.map((s) => (
              <tr key={s.subject}>
                <td>{s.subject}</td>
                <td>{s.full}</td>
                <td className="highlight">{s.target}</td>
                <td className="muted">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="section-title">一张图总结</h3>
      <div className="card">
        <div className="timeline">
          {SUMMARY_TIMELINE.map((t) => (
            <div className="timeline-row" key={t.time}>
              <div className="timeline-time">{t.time}</div>
              <div className="timeline-dot" />
              <div className="timeline-event">{t.event}</div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="section-title">核心原则</h3>
      <div className="card">
        <ol className="numbered-list">
          {CORE_PRINCIPLES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default OverviewView

