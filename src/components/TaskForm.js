import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTaskAsync } from "../features/tasks/tasksThunk";

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTaskAsync({ title, priority, category }));
    setTitle("");
    setCategory("");
  };

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-4 gap-2"
    >
      <input
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border rounded-lg px-3 py-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <select
        className="border rounded-lg px-3 py-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low"> Low</option>
        <option value="medium"> Medium</option>
        <option value="high"> High</option>
      </select>

      <button className="md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 transition">
        Add Task
      </button>
    </form>
  );
}
