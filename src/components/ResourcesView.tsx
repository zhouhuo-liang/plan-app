import { GRAPHICS_RESOURCES, KAOYAN_RESOURCES, CONFERENCES } from '../data/resources'

function ResourcesView() {
  return (
    <section>
      <h2 className="page-title">资源库</h2>

      <h3 className="section-title">图形学资源</h3>
      <div className="card resource-list">
        {GRAPHICS_RESOURCES.map((r) => (
          <div className="resource-item" key={r.name}>
            <span className="type-badge">{r.type}</span>
            <div className="resource-main">
              <div className="resource-name">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.name}
                  </a>
                ) : (
                  r.name
                )}
              </div>
              <div className="resource-note">{r.note}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">考研资料</h3>
      <div className="card resource-list">
        {KAOYAN_RESOURCES.map((r) => (
          <div className="resource-item" key={r.name}>
            <span className="type-badge">{r.type}</span>
            <div className="resource-main">
              <div className="resource-name">{r.name}</div>
              <div className="resource-note">{r.note}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">重要学术会议与期刊</h3>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>简称</th>
              <th>全称</th>
              <th>级别</th>
            </tr>
          </thead>
          <tbody>
            {CONFERENCES.map((c) => (
              <tr key={c.abbr}>
                <td className="highlight">{c.abbr}</td>
                <td className="muted">{c.full}</td>
                <td>{c.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ResourcesView
