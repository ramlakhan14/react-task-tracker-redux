import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { reorderTasks } from "../features/tasks/tasksSlice";
import TaskItem from "./TaskItem";

export default function DragDropList() {
  const dispatch = useDispatch();
  const { tasks, filter, search } =
    useSelector((s) => s.tasks.present);

const filteredTasks = tasks.filter((task) => {
  
  if (filter === "completed" && !task.completed) return false;
  if (filter === "active" && task.completed) return false;

  if (search.trim()) {
    const q = search.toLowerCase();
    return (
      task.title.toLowerCase().includes(q) ||
      (task.category || "").toLowerCase().includes(q)
    );
  }

  return true;
});


  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    dispatch(reorderTasks(arrayMove(tasks, oldIndex, newIndex)));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={filteredTasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
