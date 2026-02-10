import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip } from "recharts";

export default function StatsDashboard() {
  const tasks = useSelector((s) => s.tasks.present.tasks);

  const data = [
    { name: "Completed", value: tasks.filter(t => t.completed).length },
    { name: "Active", value: tasks.filter(t => !t.completed).length }
  ];

  return (
    <div className="bg-slate-50 rounded-lg p-4 shadow-sm">
      <h3 className="text-center text-sm font-semibold mb-2">
        Task Completion
      </h3>
      <PieChart width={240} height={240}>
        <Pie data={data} dataKey="value" outerRadius={80} />
        <Tooltip />
      </PieChart>
    </div>
  );
}
