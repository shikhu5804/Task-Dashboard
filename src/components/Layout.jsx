import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-6">
        <Navbar />
        <main className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-slate-100 dark:border-dark-border overflow-hidden min-h-[600px] flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
