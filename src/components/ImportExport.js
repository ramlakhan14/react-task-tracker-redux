import { useDispatch, useSelector } from "react-redux";
import { importTasks } from "../features/tasks/tasksSlice";

export default function ImportExport() {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.tasks);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state)], {
      type: "application/json"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tasks.json";
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/json") {
      alert("Only JSON files are supported");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        dispatch(importTasks(JSON.parse(reader.result)));
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportData}
        className="border px-3 py-1 rounded hover:bg-slate-100"
      >
        Export
      </button>
      <input
        type="file"
        accept="application/json"
        onChange={importData}
      />
    </div>
  );
}
