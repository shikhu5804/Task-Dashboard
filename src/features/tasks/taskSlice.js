import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockApi } from '../../api/mockApi';

const initialState = {
  items: [],
  status: 'idle', 
  error: null,
  filter: 'all', 
  searchQuery: '',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await mockApi.fetchTasks();
  return response;
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (initialTask) => {
  const response = await mockApi.addTask(initialTask);
  return response;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await mockApi.updateTask(task);
  return response;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await mockApi.deleteTask(taskId);
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setFilter, setSearchQuery } = taskSlice.actions;

export const selectAllTasks = (state) => state.tasks.items;
export const selectTaskStatus = (state) => state.tasks.status;
export const selectTaskError = (state) => state.tasks.error;
export const selectFilter = (state) => state.tasks.filter;
export const selectSearchQuery = (state) => state.tasks.searchQuery;

export const selectFilteredTasks = (state) => {
  const tasks = state.tasks.items;
  const filter = state.tasks.filter;
  const query = state.tasks.searchQuery.toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ? true : task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
};

export default taskSlice.reducer;
