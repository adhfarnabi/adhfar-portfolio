import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Admin from './pages/Admin'
import usePortfolio from './hooks/usePortfolio'
import useReveal from './hooks/useReveal'

function Divider() {
  return <div className="divider" />
}

function Loading() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="loading"><div className="spinner" />Loading portfolio...</div>
    </div>
  )
}

function Portfolio() {
  const { data, loading, error } = usePortfolio()
  useReveal()

  if (loading) return <Loading />
  if (error) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      flexDirection:'column', gap:'1rem', color:'var(--muted)', fontFamily:'var(--font-mono)' }}>
      <div style={{ color:'var(--coral)', fontSize:'0.9rem' }}>⚠️ Could not connect to API server</div>
      <div style={{ fontSize:'0.75rem' }}>Make sure the backend is running: <code style={{color:'var(--cyan)'}}>cd server && npm run dev</code></div>
    </div>
  )

  return (
    <>
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

      <Navbar />
      <Hero profile={data?.profile} />
      <Divider />

      {/* About */}
      <section id="about">
        <div className="section-wrap">
          <p className="section-label reveal">// about me</p>
          <h2 className="section-title reveal">Building <em>real things</em>, for real people.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'4rem', alignItems:'start' }}
               className="about-grid-responsive">
            <div className="reveal" style={{ color:'var(--muted)', lineHeight:'1.8',
              display:'flex', flexDirection:'column', gap:'1.25rem', fontSize:'1rem' }}>
              <p>I'm a <strong style={{color:'var(--text)'}}>Full Stack Web Developer</strong> specialising
                in the MERN stack. I independently architect and ship complete web applications,
                from database schema to responsive frontend.</p>
              <p>One of my proudest projects is <strong style={{color:'var(--text)'}}>Kashur Editor</strong> —
                a digital writing tool for the Kashmiri language, addressing a critical gap in tooling
                for a low-resource language spoken by millions.</p>
              <p>Currently in <strong style={{color:'var(--text)'}}>4th Semester MCA</strong> at the University
                of Kashmir. Actively seeking full-time MERN Stack Developer roles.</p>
            </div>
            <div className="reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
              {[['4+','Full-Stack Projects'],['MERN','Primary Stack'],['MCA','University of Kashmir'],['4','Languages Spoken']].map(([n,l]) => (
                <div key={l} style={{ background:'var(--bg2)', border:'1px solid var(--border)',
                  borderRadius:'12px', padding:'1.5rem', textAlign:'center',
                  transition:'border-color 0.3s,box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--violet)'; e.currentTarget.style.boxShadow='0 0 20px rgba(124,58,237,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(124,58,237,0.25)'; e.currentTarget.style.boxShadow='none'; }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'2.25rem', fontWeight:'700',
                    background:'linear-gradient(135deg,var(--violet),var(--cyan))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{n}</div>
                  <div style={{ fontSize:'0.8rem', color:'var(--muted)', marginTop:'0.25rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Divider />

      <Skills skills={data?.skills} />
      <Divider />
      <Projects projects={data?.projects} />
      <Divider />
      <Experience experience={data?.experience} />
      <Divider />
      <Education education={data?.education} certifications={data?.certifications} languages={data?.languages} />
      <Divider />
      <Contact profile={data?.profile} />

      <footer style={{ textAlign:'center', padding:'2rem', color:'var(--muted)',
        fontSize:'0.8rem', borderTop:'1px solid var(--border)', position:'relative', zIndex:1 }}>
        <p>Designed & built by <span style={{ background:'linear-gradient(135deg,var(--violet),var(--cyan))',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          fontWeight:'600' }}>Adhfar Nabi</span> — Full Stack Developer · Sopore, J&K
          &nbsp;·&nbsp; <a href="/admin" style={{color:'var(--muted)', fontSize:'0.75rem'}}>Admin</a>
        </p>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
