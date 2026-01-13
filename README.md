# TaskGlitch ✅  
**Smart Task Management & Analytics Dashboard**

🔗 Live Demo: https://task-glitch-six-rust.vercel.app/

TaskGlitch is a modern task management web application built with **React, TypeScript, and Vite**, featuring real-time metrics, analytics dashboards, and clean UX.  
It is designed to demonstrate **production-grade React patterns, strict TypeScript usage, and deployment readiness**.

---

## ✨ Features

### 📝 Task Management
- Add, edit, and delete tasks
- Undo delete functionality
- Task details dialog with notes, revenue, and time tracking

### 🔍 Filtering & Search
- Search tasks by title
- Filter by status (Todo / In Progress / Done)
- Filter by priority (High / Medium / Low)

### 📊 Metrics & Analytics
- Total revenue calculation
- Time efficiency percentage
- Revenue per hour
- Average ROI and performance grade
- Interactive charts and analytics dashboards

### 📁 Export
- Export filtered tasks as CSV

### 🧠 Activity Log
- Track recent actions (add, update, delete, undo)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Functional Components & Hooks)
- **TypeScript (strict mode)**
- **Vite** for fast builds
- **Material UI (MUI)** for UI components
- **MUI X Charts** for data visualization

### State Management
- React Context API
- Custom hooks (`useTasks`, `useUser`)

### Tooling & Deployment
- ESLint & TypeScript checks
- Git & GitHub
- **Vercel** for production deployment

---

## 📂 Project Structure
src/
├── components/ # UI components (tables, charts, dialogs)
├── context/ # React context providers
├── hooks/ # Custom hooks (business logic)
├── utils/ # Utility & calculation logic
├── types.ts # Global TypeScript types
├── App.tsx # App layout
├── main.tsx # Entry point


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/ritwishi/task-glitch.git
cd task-glitch
npm install

Run Locally
npm run dev


Open: http://localhost:5173

Production Build
npm run build

🌐 Deployment

This project is deployed on Vercel.

Production-ready build (tsc --noEmit && vite build)

Automatic redeploy on GitHub push

Zero runtime errors in production

🔗 Live URL: https://task-glitch-six-rust.vercel.app/

🧪 Quality & Best Practices

Strict TypeScript enabled

Clean separation of concerns

Memoized selectors and derived data

Reusable components

CI-friendly build process

🔮 Future Improvements

Persistent storage (localStorage / backend API)

Authentication & user accounts

Drag-and-drop task ordering

Lazy loading & bundle optimization

Custom domain & SEO enhancements

👨‍💻 Author

Ritwik Shivankar
Mechanical Engineer → Software Developer
Passionate about building scalable, production-ready web applications.

📌 GitHub: https://github.com/ritwishi

⭐️ Support

If you like this project:

⭐️ Star the repository

🍴 Fork it

🐛 Report issues or suggest improvements
