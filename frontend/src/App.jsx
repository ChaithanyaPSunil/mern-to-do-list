// Main component — holds task state and talks to the backend API
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Fetch all tasks once when the page loads (GET)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch(() => setError("Could not load tasks. Is the backend running?"));
  }, []);

  // Add a task (POST), then put it at the top of the list
  async function addTask(title) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error();
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
      setError("");
      return true;
    } catch {
      setError("Could not add task.");
      return false;
    }
  }

  // Mark complete/incomplete (PUT), then replace that task in state
  async function toggleTask(task) {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
    } catch {
      setError("Could not update task.");
    }
  }

  // Delete a task (DELETE), then remove it from state
  async function deleteTask(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch {
      setError("Could not delete task.");
    }
  }

  // Derived values for stats, progress bar and filters
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const visibleTasks = tasks.filter((t) =>
    filter === "active" ? !t.completed : filter === "completed" ? t.completed : true
  );
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">✓</span> TaskFlow
        </div>
        <span className="date">{today}</span>
      </header>

      <main className="main">
        <section className="hero">
          <h1>My Tasks</h1>
          <p>
            {tasks.length === 0
              ? "Start by adding your first task."
              : activeCount === 0
              ? "All caught up! 🎉"
              : `You have ${activeCount} task${activeCount > 1 ? "s" : ""} left to do.`}
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-value">{tasks.length}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeCount}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">Completed</div>
          </div>
        </section>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}% complete</span>

        <TaskForm onAdd={addTask} />
        {error && <p className="error">{error}</p>}

        <div className="filters">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      <footer className="footer">Built with MongoDB · Express · React · Node.js</footer>
    </div>
  );
}