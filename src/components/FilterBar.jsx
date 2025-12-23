import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectSearchQuery, setFilter, setSearchQuery } from '../features/tasks/taskSlice';
import clsx from 'clsx';

export default function FilterBar() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectFilter);
  const searchQuery = useSelector(selectSearchQuery);

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-dark-surface sticky top-0 z-10">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => dispatch(setFilter(filter.id))}
            className={clsx(
              'px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-1 sm:flex-none',
              currentFilter === filter.id
                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
