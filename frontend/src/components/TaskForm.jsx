// Form to add a new task
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    if (!title.trim()) return; // ignore empty input
    const added = await onAdd(title); // send to backend via App
    if (added) setTitle(""); // clear input on success
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}