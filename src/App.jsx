import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./features/tasks/taskSlice";
import Layout from "./components/Layout";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import TaskFormModal from "./components/TaskFormModal";
import { Plus } from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6">
        
        <div className="mx-auto max-w-5xl rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
          
          <div className="px-8 py-6 border-b border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Task Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Organize, track, and complete your tasks efficiently
              </p>
            </div>

            <button
              onClick={handleAddTask}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700
              shadow-lg shadow-indigo-500/30
              hover:shadow-xl hover:shadow-purple-500/40
              transition-all active:scale-95"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>

          <div className="px-8 py-4 bg-slate-50/60 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800">
            <FilterBar />
          </div>

          <div className="px-8 py-6">
            <TaskList onEditTask={handleEditTask} />
          </div>
        </div>

        <TaskFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskToEdit={editingTask}
        />
      </div>
    </Layout>
  );
}

export default App;
