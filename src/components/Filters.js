import { useDispatch } from "react-redux";
import { setFilter } from "../features/tasks/tasksSlice";

export default function Filters() {
  const dispatch = useDispatch();

  const btn =
    "px-4 py-1 rounded-full border text-sm hover:bg-slate-100 transition";

  return (
    <div className="flex gap-2 justify-center">
      <button className={btn} onClick={() => dispatch(setFilter("all"))}>
        All
      </button>
      <button className={btn} onClick={() => dispatch(setFilter("active"))}>
        Active
      </button>
      <button className={btn} onClick={() => dispatch(setFilter("completed"))}>
        Completed
      </button>
    </div>
  );
}
