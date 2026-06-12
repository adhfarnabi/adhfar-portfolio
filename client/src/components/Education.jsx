import './Education.css'

export default function Education({ education, certifications, languages }) {
  return (
    <section id="education">
      <div className="section-wrap">
        <p className="section-label reveal">// education</p>
        <h2 className="section-title reveal">Where I <em>studied</em></h2>
        <div className="edu-grid">
          {education?.map((e, i) => (
            <div className="edu-card reveal" key={i}>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-school">{e.school}</div>
              <div className="edu-year">{e.year}</div>
              <p className="edu-note">{e.note}</p>
            </div>
          ))}
        </div>

        <p className="section-label reveal" style={{marginTop:'4rem'}}>// certifications</p>
        <h2 className="section-title reveal">What I've <em>earned</em></h2>
        <div className="cert-list">
          {certifications?.map((c, i) => (
            <div className="cert-item reveal" key={i}>
              <span className="cert-icon">{c.icon}</span>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="section-label reveal" style={{marginTop:'4rem'}}>// languages</p>
        <h2 className="section-title reveal">How I <em>communicate</em></h2>
        <div className="lang-grid">
          {languages?.map((l, i) => (
            <div className="lang-card reveal" key={i}>
              <div className="lang-name">{l.name}</div>
              <div className="lang-level">{l.level}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
