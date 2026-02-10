import { useSelector } from "react-redux";

export default function ShareTasks() {
  const state = useSelector((s) => s.tasks);

  const share = () => {
    const encoded = btoa(JSON.stringify(state));
    navigator.clipboard.writeText(encoded);
    alert("Share code copied! (mock collaboration)");
  };

  return (
    <button
      onClick={share}
      className="border px-3 py-1 rounded"
    >
      🔗 Share Tasks
    </button>
  );
}
