import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../features/tasks/tasksSlice";

export default function UndoRedo() {
  const dispatch = useDispatch();

  const { past, future } = useSelector((s) => s.tasks);

  const baseBtn =
    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2";

  return (
    <div className="flex gap-3">
      <button
        onClick={() => dispatch(undo())}
        disabled={!past.length}
        className={`${baseBtn} ${
          past.length
            ? "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400"
            : "bg-slate-50 text-slate-400 cursor-not-allowed"
        }`}
        aria-label="Undo last action"
      >
        ↶ Undo
      </button>

      <button
        onClick={() => dispatch(redo())}
        disabled={!future.length}
        className={`${baseBtn} ${
          future.length
            ? "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400"
            : "bg-slate-50 text-slate-400 cursor-not-allowed"
        }`}
        aria-label="Redo last action"
      >
        ↷ Redo
      </button>
    </div>
  );
}
