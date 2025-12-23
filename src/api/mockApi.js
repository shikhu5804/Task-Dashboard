const STORAGE_KEY = 'task-dashboard-data';
const DELAY_MS = 800;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initialTasks = [
  { id: '1', title: 'Complete Project Assignment', status: 'pending', createdAt: new Date().toISOString() },
  { id: '2', title: 'Review Redux Toolkit Docs', status: 'completed', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', title: 'Setup GitHub Repository', status: 'completed', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const getStoredTasks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }
  return JSON.parse(data);
};

const setStoredTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const mockApi = {
  fetchTasks: async () => {
    await delay(DELAY_MS);
    return getStoredTasks();
  },

  addTask: async (task) => {
    await delay(DELAY_MS);
    const tasks = getStoredTasks();
    const newTask = { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const updatedTasks = [newTask, ...tasks];
    setStoredTasks(updatedTasks);
    return newTask;
  },

  updateTask: async (updatedTask) => {
    await delay(DELAY_MS);
    const tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = { ...tasks[index], ...updatedTask };
    setStoredTasks(tasks);
    return tasks[index];
  },

  deleteTask: async (taskId) => {
    await delay(DELAY_MS);
    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setStoredTasks(updatedTasks);
    return taskId;
  }
};
