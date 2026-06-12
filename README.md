# Adhfar Nabi — Portfolio Website
### Full Stack MERN Web App

A production-grade personal portfolio built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

---

## 🗂 Project Structure

```
adhfar-portfolio/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Hero, Navbar, Skills, Projects, Experience, Education, Contact
│   │   ├── hooks/        # usePortfolio, useReveal
│   │   ├── api.js        # Axios API service layer
│   │   ├── App.jsx       # Root component
│   │   └── index.css     # Global design tokens + styles
│   └── vite.config.js    # Vite config with /api proxy
│
├── server/               # Node.js + Express backend
│   ├── routes/
│   │   ├── data.js       # GET /api/data — serves all portfolio content
│   │   └── contact.js    # POST /api/contact — saves contact form messages
│   ├── models/
│   │   └── Contact.js    # Mongoose schema for contact messages
│   ├── index.js          # Express app entry point
│   └── .env              # Environment variables (edit this)
│
└── package.json          # Root: concurrently runs both servers
```

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v8+
- (Optional) MongoDB — app works without it, just without saving contacts

### 1. Install dependencies

```bash
# From the project root
cd adhfar-portfolio

npm install                    # installs concurrently
cd server && npm install       # installs Express, Mongoose, etc.
cd ../client && npm install    # installs React, Vite, Axios
cd ..
```

### 2. Configure environment

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/adhfar_portfolio   # optional
CLIENT_URL=http://localhost:5173
```

If you don't have MongoDB, just leave `MONGO_URI` empty — the app still works fully, it just won't save contact form messages to a database.

### 3. Run the app

```bash
# From project root — starts both backend (port 5000) and frontend (port 5173)
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/data` | All portfolio data (profile, skills, projects, etc.) |
| GET | `/api/data/profile` | Profile info only |
| GET | `/api/data/skills` | Skills list |
| GET | `/api/data/projects` | Projects list |
| GET | `/api/data/experience` | Work experience |
| GET | `/api/data/education` | Education |
| GET | `/api/data/certifications` | Certifications |
| POST | `/api/contact` | Submit a contact form message |
| GET | `/api/contact` | View all received messages (requires MongoDB) |

---

## ✏️ Customising Content

All portfolio content lives in **`server/routes/data.js`** as a plain JS object. To update your projects, skills, experience etc., just edit that file — no database required for content.

---

## 🚢 Deploying

### Frontend → Vercel / Netlify
```bash
cd client && npm run build
# Upload the dist/ folder to Vercel or Netlify
```

### Backend → Railway / Render
- Set environment variables `PORT`, `MONGO_URI`, `CLIENT_URL` in your platform's dashboard
- Deploy the `server/` folder

### Full Stack → Railway (easiest)
1. Push the whole project to GitHub
2. Create a Railway project → connect repo
3. Add two services: one for `server/`, one for `client/`
4. Set environment variables

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose (optional) |
| Auth-ready | JWT structure in place |
| Styling | Custom CSS with design tokens |
| Dev tools | Concurrently, Nodemon |

---

Built by **Adhfar Nabi** · [linkedin.com/in/adhfar-nabi](https://linkedin.com/in/adhfar-nabi) · [github.com/adhfarnabi](https://github.com/adhfarnabi)
