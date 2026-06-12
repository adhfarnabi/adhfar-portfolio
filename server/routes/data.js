const express = require('express');
const router = express.Router();

const portfolioData = {
  profile: {
    name: "Adhfar Nabi",
    title: "Full Stack Web Developer",
    subtitle: "MERN Stack Developer — React.js · Node.js · MongoDB",
    email: "adhfarnabi2020@gmail.com",
    linkedin: "https://linkedin.com/in/adhfar-nabi",
    github: "https://github.com/adhfarnabi",
    location: "Sopore, Baramulla, J&K — India",
    summary: "Full Stack Web Developer with practical experience designing, building, and deploying MERN stack web applications. Independently architected and shipped multiple full-stack projects including a Kashmiri language editor and a JWT-authenticated campus collaboration platform."
  },
  skills: [
    { category: "Frontend", icon: "⚛️", tags: ["React.js","JavaScript ES6+","HTML5","CSS3","Bootstrap 5","Responsive Design"] },
    { category: "Backend",  icon: "⚙️", tags: ["Node.js","Express.js","REST API Design","JWT Auth","Middleware"] },
    { category: "Database", icon: "🗄️", tags: ["MongoDB","MySQL","Mongoose ODM","Schema Design"] },
    { category: "Tools",    icon: "🛠️", tags: ["Git","GitHub","Postman","VS Code","npm","Chrome DevTools"] },
    { category: "Languages",icon: "💻", tags: ["JavaScript","Python","C++","C"] },
    { category: "CS Fundamentals", icon: "📚", tags: ["DSA","OOP","DBMS","Computer Networks","OS"] }
  ],
  projects: [
    {
      id: 1, icon: "🌿", name: "Kashur Editor",
      desc: "A full-stack digital writing and editing tool for the Kashmiri language — addressing a critical gap in digital tooling for a low-resource language. JWT auth, persistent document storage, language-specific text processing.",
      stack: ["React.js","Node.js","Express.js","MongoDB","JWT","REST API"],
      highlight: true
    },
    {
      id: 2, icon: "🎓", name: "CampusConnect",
      desc: "A full-stack campus collaboration platform centralising student-faculty communication, resource sharing, and event updates. Role-based access control, dynamic routing, real-time content updates.",
      stack: ["React.js","Node.js","Express.js","MongoDB","JWT","REST API"],
      highlight: false
    },
    {
      id: 3, icon: "🚨", name: "Rapid Rescue",
      desc: "An emergency response coordination web application streamlining real-time communication between users and emergency responders. Complete backend API and responsive frontend.",
      stack: ["React.js","Node.js","Express.js","MongoDB"],
      highlight: false
    },
    {
      id: 4, icon: "📋", name: "Student Management System",
      desc: "CRUD-based student records system with normalised MySQL relational database, REST API backend, and React.js frontend. Foreign-key relationships and parameterised queries to prevent SQL injection.",
      stack: ["React.js","Node.js","Express.js","MySQL","REST API"],
      highlight: false
    }
  ],
  experience: [
    {
      role: "Full Stack Web Developer Intern",
      company: "International Institute of SDGs & Public Policy Research",
      period: "2024 · 1 Month",
      bullets: [
        "Developed and maintained MERN stack web applications for research and public policy digital workflows.",
        "Built REST API endpoints connecting React.js frontend to Node.js/Express.js backend, reducing manual data handling.",
        "Designed and optimised MongoDB schemas, improving query performance across modules.",
        "Executed full SDLC: requirements analysis, feature implementation, debugging, testing, deployment.",
        "Collaborated via Git version control with structured code review practices."
      ]
    }
  ],
  education: [
    { degree: "Master of Computer Applications (MCA)", school: "University of Kashmir", year: "2024 – 2026 · 4th Semester", note: "Web Technologies, DBMS, Software Engineering, Computer Networks, Cloud Computing, OS" },
    { degree: "Bachelor of Science (B.Sc.)", school: "University of Kashmir", year: "2021 – 2024 · Completed", note: "Strong foundation in computing and mathematics." }
  ],
  certifications: [
    { name: "Responsive Web Design", issuer: "freeCodeCamp", icon: "🏆" },
    { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", icon: "🏆" },
    { name: "Frontend Development Certification", issuer: "Online Platform", icon: "🎖️" },
    { name: "Web Development Certification", issuer: "Online Platform", icon: "🎖️" }
  ],
  languages: [
    { name: "Kashmiri", level: "Native" },
    { name: "English",  level: "Professional" },
    { name: "Hindi",    level: "Fluent" },
    { name: "Urdu",     level: "Fluent" }
  ]
};

router.get('/', (req, res) => res.json(portfolioData));
router.get('/profile',        (req, res) => res.json(portfolioData.profile));
router.get('/skills',         (req, res) => res.json(portfolioData.skills));
router.get('/projects',       (req, res) => res.json(portfolioData.projects));
router.get('/experience',     (req, res) => res.json(portfolioData.experience));
router.get('/education',      (req, res) => res.json(portfolioData.education));
router.get('/certifications', (req, res) => res.json(portfolioData.certifications));

module.exports = router;
