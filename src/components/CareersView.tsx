import { CAREERS, TIER_LABELS, CAREER_SUMMARY } from '../data/careers'
import type { Career } from '../data/careers'

const TIER_ORDER: Career['tier'][] = ['first', 'second', 'third']

function CareersView() {
  return (
    <section>
      <h2 className="page-title">职业方向</h2>
      <div className="note-card">{CAREER_SUMMARY}</div>

      {TIER_ORDER.map((tier) => (
        <div key={tier}>
          <h3 className="section-title">{TIER_LABELS[tier]}</h3>
          <div className="career-grid">
            {CAREERS.filter((c) => c.tier === tier).map((c) => (
              <div className="card career-card" key={c.name}>
                <div className="career-head">
                  <span className="career-name">{c.name}</span>
                  <span className="fit-stars">{c.fit}</span>
                </div>
                <div className="career-row">
                  <span className="career-label">你的优势</span>
                  <span>{c.advantage}</span>
                </div>
                <div className="career-row">
                  <span className="career-label">缺什么</span>
                  <span>{c.lack}</span>
                </div>
                <div className="career-row">
                  <span className="career-label">薪资</span>
                  <span>{c.salary}</span>
                </div>
                <p className="career-note">💡 {c.note}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default CareersView
