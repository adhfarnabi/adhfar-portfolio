import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './Admin.css'

const api = axios.create({ baseURL: '/api' })

export default function Admin() {
  const [token,    setToken]    = useState(() => localStorage.getItem('admin_token') || '')
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(false)
  const [selected, setSelected] = useState(null)
  const [noDb,     setNoDb]     = useState(false)

  const fetchMessages = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await api.get('/contact', { headers: { Authorization: `Bearer ${token}` } })
      setMessages(res.data.messages || [])
      setNoDb(!!res.data.note)
    } catch (err) {
      if (err.response?.status === 401) { setToken(''); localStorage.removeItem('admin_token') }
    } finally { setLoading(false) }
  }, [token])

  useEffect(() => { if (token) fetchMessages() }, [token, fetchMessages])

  const handleLogin = async e => {
    e.preventDefault(); setLoginErr('')
    try {
      const res = await api.post('/admin/login', { password })
      setToken(res.data.token)
      localStorage.setItem('admin_token', res.data.token)
    } catch { setLoginErr('Wrong password. Try again.') }
  }

  const markRead = async id => {
    try {
      await api.patch(`/contact/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } })
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m))
    } catch {}
  }

  const deleteMsg = async id => {
    if (!window.confirm('Delete this message?')) return
    try {
      await api.delete(`/contact/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      setMessages(prev => prev.filter(m => m._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch {}
  }

  const logout = () => { setToken(''); localStorage.removeItem('admin_token'); setMessages([]) }
  const unread = messages.filter(m => !m.read).length

  if (!token) return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-logo">AN/</div>
        <h1>Admin Dashboard</h1>
        <p>Enter your admin password to view messages</p>
        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Admin password" value={password}
            onChange={e => setPassword(e.target.value)} autoFocus />
          {loginErr && <div className="login-err">{loginErr}</div>}
          <button type="submit" className="btn-login">Login →</button>
        </form>
        <a href="/" className="back-link">← Back to portfolio</a>
      </div>
    </div>
  )

  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">AN/ <span>Admin</span></div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <span>📬</span> Messages
            {unread > 0 && <span className="badge">{unread}</span>}
          </div>
        </nav>
        <div className="sidebar-bottom">
          <a href="/" className="sidebar-link">← Portfolio</a>
          <button onClick={logout} className="sidebar-logout">Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Contact Messages</h1>
            <p>{messages.length} total &nbsp;·&nbsp; {unread} unread</p>
          </div>
          <button onClick={fetchMessages} className="btn-refresh">↻ Refresh</button>
        </header>

        {noDb && (
          <div className="admin-notice">
            ⚠️ MongoDB not connected — messages are not being saved. Set <code>MONGO_URI</code> in <code>server/.env</code>.
          </div>
        )}

        {loading ? (
          <div className="admin-loading"><div className="spinner"/>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">📭</div>
            <p>No messages yet.</p>
            <p className="empty-sub">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="msg-layout">
            <div className="msg-list">
              {messages.map(m => (
                <div key={m._id}
                  className={`msg-item ${!m.read ? 'unread' : ''} ${selected?._id === m._id ? 'active' : ''}`}
                  onClick={() => { setSelected(m); if (!m.read) markRead(m._id) }}>
                  <div className="msg-item-top">
                    <span className="msg-sender">{m.name}</span>
                    <span className="msg-date">{new Date(m.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
                  </div>
                  <div className="msg-subject">{m.subject}</div>
                  <div className="msg-preview">{m.message.slice(0, 70)}...</div>
                  {!m.read && <span className="unread-dot"/>}
                </div>
              ))}
            </div>

            <div className="msg-detail">
              {selected ? (
                <>
                  <div className="detail-header">
                    <div>
                      <h2>{selected.subject}</h2>
                      <div className="detail-meta">
                        <span>From: <strong>{selected.name}</strong></span>
                        <a href={`mailto:${selected.email}`} className="detail-email">{selected.email}</a>
                        <span className="detail-date">{new Date(selected.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="detail-actions">
                      <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                         className="btn-reply">Reply →</a>
                      <button onClick={() => deleteMsg(selected._id)} className="btn-delete">🗑 Delete</button>
                    </div>
                  </div>
                  <div className="detail-body">{selected.message}</div>
                </>
              ) : (
                <div className="detail-placeholder">
                  <span>👈</span>
                  <p>Select a message to read it</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
