import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/tasks/tasksSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((s) => s.tasks.present.search);

  return (
    <input
      type="text"
      value={search}
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      placeholder="🔍 Search by task or category..."
      onChange={(e) => dispatch(setSearch(e.target.value))}
      aria-label="Search tasks"
    />
  );
}
