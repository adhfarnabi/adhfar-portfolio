import { useState } from 'react'
import { sendContact } from '../api'
import './Contact.css'

export default function Contact({ profile }) {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [msg, setMsg]       = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await sendContact(form)
      setMsg(res.data.message)
      setStatus('success')
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch (err) {
      setMsg(err.response?.data?.error || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <div className="contact-inner">
          <p className="section-label reveal">// contact</p>
          <h2 className="section-title reveal">Let's <em>build something</em></h2>
          <p className="contact-sub reveal">Open to full-time MERN Stack / Full Stack Developer roles. Have a project or an opening? I'd love to connect.</p>

          <div className="contact-grid">
            <div className="contact-links reveal">
              <a href={`mailto:${profile?.email}`} className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <div><div className="cl-label">Email</div><div className="cl-val">{profile?.email}</div></div>
              </a>
              <a href={profile?.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                <div><div className="cl-label">LinkedIn</div><div className="cl-val">adhfar-nabi</div></div>
              </a>
              <a href={profile?.github} target="_blank" rel="noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                <div><div className="cl-label">GitHub</div><div className="cl-val">adhfarnabi</div></div>
              </a>
              <div className="contact-link no-hover">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div><div className="cl-label">Location</div><div className="cl-val">Sopore, J&K — India</div></div>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Tell me about the opportunity or project..." required />
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
              {msg && <div className={`form-msg ${status}`}>{msg}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
