import './Projects.css'

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <div className="section-wrap">
        <p className="section-label reveal">// projects</p>
        <h2 className="section-title reveal">Things I've <em>built</em></h2>
        <div className="projects-grid">
          {projects?.map(p => (
            <div className={`project-card reveal ${p.highlight ? 'featured' : ''}`} key={p.id}>
              <div className="project-icon">{p.icon}</div>
              <div className="project-name">{p.name}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(s => <span className="stack-pill" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
