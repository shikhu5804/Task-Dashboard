import { LayoutDashboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-1">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary-500 rounded-xl shadow-lg shadow-primary-500/30">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Task Dashboard
        </h1>
      </div>
      <ThemeToggle />
    </nav>
  );
}
