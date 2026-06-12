import './Skills.css'

export default function Skills({ skills }) {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <p className="section-label reveal">// technical skills</p>
        <h2 className="section-title reveal">What I <em>work with</em></h2>
        <div className="skills-grid">
          {skills?.map((group, i) => (
            <div className="skill-group reveal" key={i}>
              <div className="skill-group-title">{group.icon} {group.category}</div>
              <div className="skill-tags">
                {group.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
