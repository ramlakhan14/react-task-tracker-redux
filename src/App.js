import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import StatsDashboard from "./components/StatsDashboard";
import UndoRedo from "./components/UndoRedo";
import ImportExport from "./components/ImportExport";
import DragDropList from "./components/DragDropList";
import ShareTasks from "./components/ShareTasks";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-slate-800">
            📝 Task Tracker
          </h1>
          <p className="text-sm text-slate-500">
            Organize your work efficiently
          </p>
        </header>

        <TaskForm />
        <SearchBar />
        <Filters />

        <div className="flex justify-between items-center">
          <UndoRedo />
          <ImportExport />
        </div>

        <DragDropList />

        <div className="flex justify-center">
          <StatsDashboard />
        </div>
        <ShareTasks />
      </div>
    </div>
  );
}
