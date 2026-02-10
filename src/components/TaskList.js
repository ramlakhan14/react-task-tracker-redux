import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, filter, search } =
    useSelector((s) => s.tasks.present);

  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return t.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ul className="space-y-2">
      {filtered.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
