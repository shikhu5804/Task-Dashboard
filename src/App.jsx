import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './features/tasks/taskSlice';
import Layout from './components/Layout';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import { Plus } from 'lucide-react';

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
      <div className="flex flex-col h-full">
        <FilterBar />
        
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex justify-end">
          <button
            onClick={handleAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 transition-all hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
          >
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>

        <TaskList onEditTask={handleEditTask} />
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={editingTask}
      />
    </Layout>
  );
}

export default App;
