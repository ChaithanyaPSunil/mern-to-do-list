// A single task row: custom checkbox, title, timestamp and delete button
export default function TaskItem({ task, onToggle, onDelete }) {
  const added = new Date(task.createdAt).toLocaleString("en-IN", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });

  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)} // PUT: flip completed
        />
        <span className="checkmark"></span>
      </label>
      <div className="task-text">
        <span className="task-title">{task.title}</span>
        <span className="task-date">Added {added}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        🗑 Delete
      </button>
    </li>
  );
}