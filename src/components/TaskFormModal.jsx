import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNewTask, updateTask } from '../features/tasks/taskSlice';
import clsx from 'clsx';

export default function TaskFormModal({ isOpen, onClose, taskToEdit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
    } else {
      setTitle('');
    }
    setError('');
  }, [taskToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        await dispatch(updateTask({ ...taskToEdit, title: title.trim() })).unwrap();
      } else {
        await dispatch(addNewTask({
          title: title.trim(),
          status: 'pending'
        })).unwrap();
      }
      onClose();
    } catch (err) {
      setError('Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {taskToEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="What needs to be done?"
              className={clsx(
                "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none transition-all",
                error 
                  ? "border-red-500 focus:ring-2 focus:ring-red-200" 
                  : "border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
              )}
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-lg shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {isSubmitting ? 'Saving...' : (taskToEdit ? 'Save Changes' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
