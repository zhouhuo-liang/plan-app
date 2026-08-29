import {
  TUTOR_TIERS,
  DUAL_SELECT_FLOW,
  DUAL_SELECT_WARNING,
  INTERVIEW_SCORE,
  CONTACT_TIMELINE,
  EMAIL_TEMPLATE,
} from '../data/interview'

function InterviewView() {
  return (
    <section>
      <h2 className="page-title">复试 · 导师</h2>

      <h3 className="section-title">华工计算机学院学术团队</h3>
      {TUTOR_TIERS.map((tier) => (
        <div className="card tutor-card" key={tier.tier}>
          <h4 className="tutor-tier-title">{tier.label}</h4>
          <p className="tutor-tier-note">{tier.note}</p>
          <table className="table">
            <thead>
              <tr>
                <th>导师</th>
                <th>头衔</th>
                <th>方向</th>
                <th>友好度</th>
              </tr>
            </thead>
            <tbody>
              {tier.tutors.map((t) => (
                <tr key={t.name}>
                  <td className="highlight">{t.name}</td>
                  <td>{t.title}</td>
                  <td className="muted">{t.direction}</td>
                  <td className="fit-stars">{t.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h3 className="section-title">复试双向选择：真正的录取流程</h3>
      <div className="card">
        <ol className="numbered-list">
          {DUAL_SELECT_FLOW.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="warn-text">⚠️ {DUAL_SELECT_WARNING}</p>
        <p className="muted">{INTERVIEW_SCORE}</p>
      </div>

      <h3 className="section-title">联系导师时间线</h3>
      <div className="card">
        <div className="timeline">
          {CONTACT_TIMELINE.map((t) => (
            <div className="timeline-row" key={t.time}>
              <div className="timeline-time">{t.time}</div>
              <div className="timeline-dot" />
              <div className="timeline-event">{t.action}</div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="section-title">联系导师邮件模板</h3>
      <div className="card">
        <div className="email-subject">{EMAIL_TEMPLATE.subject}</div>
        <ol className="numbered-list">
          {EMAIL_TEMPLATE.body.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ol>
        <p className="muted">附件：个人简历（PDF，含项目截图和 GitHub 链接）</p>
      </div>
    </section>
  )
}

export default InterviewView
