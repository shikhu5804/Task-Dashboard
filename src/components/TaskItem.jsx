import { CheckCircle2, Circle, Trash2, Edit2, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../features/tasks/taskSlice';

export default function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch();
  const isCompleted = task.status === 'completed';

  const handleToggle = () => {
    dispatch(updateTask({ ...task, status: isCompleted ? 'pending' : 'completed' }));
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 rounded-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      <button
        onClick={handleToggle}
        className={clsx(
          "flex-shrink-0 transition-colors duration-200",
          isCompleted ? "text-green-500" : "text-slate-300 hover:text-primary-500"
        )}
      >
        {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={clsx(
          "font-medium truncate transition-all duration-200",
          isCompleted ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"
        )}>
          {task.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
          <Clock size={12} />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          {task.status === 'pending' && (
            <span className="px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 font-medium text-[10px] uppercase tracking-wider">
              Pending
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
          title="Edit Task"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
