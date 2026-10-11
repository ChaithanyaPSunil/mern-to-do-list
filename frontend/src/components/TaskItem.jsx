// A single task row: checkbox, title and delete button
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)} // PUT: flip completed
      />
      <span className={task.completed ? "completed" : ""}>{task.title}</span>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}