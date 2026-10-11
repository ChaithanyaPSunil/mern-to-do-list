// Main component — holds task state and talks to the backend API
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>
      <TaskForm onAdd={addTask} />
      {error && <p className="error">{error}</p>}
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}