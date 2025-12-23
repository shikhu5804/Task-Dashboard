import { useSelector } from 'react-redux';
import { selectFilteredTasks, selectTaskStatus, selectTaskError } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import { ClipboardList, Loader2 } from 'lucide-react';

export default function TaskList({ onEditTask }) {
  const tasks = useSelector(selectFilteredTasks);
  const status = useSelector(selectTaskStatus);
  const error = useSelector(selectTaskError);

  if (status === 'loading' && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 size={40} className="animate-spin mb-4 text-primary-500" />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl mx-6 my-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
          <ClipboardList size={32} />
        </div>
        <p className="font-medium text-slate-600 dark:text-slate-300">No tasks found</p>
        <p className="text-sm mt-1">Try changing filters or adding a new task.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEditTask} />
      ))}
    </div>
  );
}
