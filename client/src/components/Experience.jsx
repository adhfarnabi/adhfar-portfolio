import './Experience.css'

export default function Experience({ experience }) {
  return (
    <section id="experience" className="exp-section">
      <div className="section-wrap">
        <p className="section-label reveal">// experience</p>
        <h2 className="section-title reveal">Where I've <em>worked</em></h2>
        {experience?.map((e, i) => (
          <div className="exp-card reveal" key={i}>
            <div className="exp-dot" />
            <div>
              <div className="exp-role">{e.role}</div>
              <div className="exp-company">{e.company}</div>
              <div className="exp-period">{e.period}</div>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
