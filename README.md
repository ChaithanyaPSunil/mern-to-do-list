# TaskFlow — MERN Stack To-Do List

A full-stack To-Do List web application built with **MongoDB, Express.js, React.js and Node.js**.
Tasks are stored in a MongoDB database and managed through a REST API, so they persist across page refreshes.

**Name:** Chaithanya P Sunil  
**Roll No:** B23CS1123 
**Course:** 23CSB40B — Web Technology (S7 CSE), Assignment 2

---

## Features
- Add, view, update (mark complete/incomplete) and delete tasks
- All changes saved to MongoDB through an Express REST API
- UI updates instantly without page reload (React state)
- Task stats, progress bar and All / Active / Completed filters
- Input validation (empty titles rejected) and restricted CORS

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Other | dotenv, cors |

## Project Structure
```
mern-to-do-list/
├── backend/
│   ├── models/Task.js       # Mongoose schema
│   ├── routes/tasks.js      # CRUD API routes
│   ├── server.js            # Express server + DB connection
│   └── .env.example         # Environment variable template
├── frontend/
│   └── src/
│       ├── components/      # TaskForm, TaskList, TaskItem
│       ├── App.jsx          # State + API calls
│       └── index.css        # Styles
└── screenshots/
```

## API Endpoints
| Method | Endpoint | Description | Success code |
|---|---|---|---|
| GET | `/api/tasks` | Fetch all tasks | 200 |
| POST | `/api/tasks` | Add a new task | 201 |
| PUT | `/api/tasks/:id` | Update title / completed | 200 |
| DELETE | `/api/tasks/:id` | Delete a task | 200 |

Errors: `400` for an empty title, `404` if the task is not found.

## How to Run

### Prerequisites
- Node.js (v18 or later)
- A MongoDB Atlas cluster (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/ChaithanyaPSunil/mern-to-do-list.git
cd mern-to-do-list
```

### 2. Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` (see `.env.example`):
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```
Start the server:
```bash
npm start
```
The server runs on **http://localhost:5000**.

### 3. Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
The app opens on **http://localhost:5173**.

> The backend allows CORS only from `http://localhost:5173`.

## Screenshots

**Adding tasks**
![Add task](screenshots/01-add-task.png)

**Completing tasks**
![Complete task](screenshots/02-complete-task.png)

**Deleting a task**
![Delete task](screenshots/03-delete-task.png)

**Merged pull requests**
![Merged PRs](screenshots/04-merged-prs.png)

## Git Workflow
- `feature/backend`: backend development, merged into `main` via pull request
- `feature/frontend`: frontend development, merged into `main` via pull request
- `docs/readme`: documentation and screenshots
- `.env` and `node_modules` are excluded with `.gitignore`