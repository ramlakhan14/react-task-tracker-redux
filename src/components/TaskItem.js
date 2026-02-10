import { useDispatch } from "react-redux";
import { useState } from "react";
import { toggleTask, deleteTask, updateTask } from "../features/tasks/tasksSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityStyles = {
  low: "border-l-4 border-green-500",
  medium: "border-l-4 border-yellow-500",
  high: "border-l-4 border-red-500"
};

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const saveEdit = () => {
    if (!value.trim()) return;
    dispatch(updateTask({ ...task, title: value }));
    setEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition ${priorityStyles[task.priority]}`}
      role="listitem"
      tabIndex={0}
    >
      
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-600 select-none"
        aria-label="Drag task"
      >
        ☰
      </span>


      <div className="flex-1">
        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            autoFocus
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <p
            onDoubleClick={() => setEditing(true)}
            onClick={() => dispatch(toggleTask(task.id))}
            className={`font-medium cursor-pointer ${
              task.completed ? "line-through text-slate-400" : "text-slate-800"
            }`}
          >
            {task.title}
          </p>
        )}

        <div className="text-xs text-slate-500 flex gap-2">
          <span>{task.category || "No category"}</span>
          <span>•</span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </div>

      
      <button
        aria-label="Delete task"
        onClick={(e) => {
          e.stopPropagation(); 
          dispatch(deleteTask(task.id));
        }}
        className="text-red-500 hover:text-red-700 text-lg px-2"
      >
        ✕
      </button>
    </li>
  );
}
