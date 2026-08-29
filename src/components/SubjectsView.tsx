import { CS408, CS408_ORDER, CS408_METHOD, MATH_PARTS, MATH_NOTE } from '../data/subjects'

function SubjectsView() {
  return (
    <section>
      <h2 className="page-title">408 · 数学</h2>

      <h3 className="section-title">408 四门课：学法决定效率</h3>
      <div className="note-card">
        <strong>学习顺序</strong>：{CS408_ORDER}
      </div>

      <div className="course-grid">
        {CS408.map((c) => (
          <div className="card course-card" key={c.name}>
            <div className="course-head">
              <span className="course-name">{c.name}</span>
              <span className="course-difficulty">{c.difficulty}</span>
            </div>
            <div className="course-tags">
              <span className="tag">{c.essence}</span>
            </div>
            <p className="course-trait">{c.trait}</p>
            <ul className="plain-list">
              {c.methods.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="note-card">{CS408_METHOD}</div>

      <h3 className="section-title">数学一：120 分是刷出来的</h3>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>部分</th>
              <th>占比</th>
              <th>难点</th>
              <th>错在哪</th>
              <th>学法</th>
            </tr>
          </thead>
          <tbody>
            {MATH_PARTS.map((m) => (
              <tr key={m.part}>
                <td className="highlight">{m.part}</td>
                <td>{m.ratio}</td>
                <td>{m.difficulty}</td>
                <td className="muted">{m.mistake}</td>
                <td>{m.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note-card">{MATH_NOTE}</div>
    </section>
  )
}

export default SubjectsView
