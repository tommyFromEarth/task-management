import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskState } from '../interfaces/TaskState';
import { API_URL } from '../utils/Utils';


const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { token: string | null } };
    try {
      const response = await axios.get(API_URL+'api/tasks', {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return response.data;
    } catch (error: any) {
        if(error.response.data.message === 'Token no válido'){
            window.location.href = '/login';
            localStorage.removeItem('token')
        }
      return rejectWithValue(error.response.data.message || 'Error al obtener tareas'+error);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: { title: string; description: string }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { token: string | null } };
    try {
      const response = await axios.post(API_URL+'api/tasks', task, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Error al crear tarea');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: number, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { token: string | null } };
    try {
      await axios.delete(`${API_URL}api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Error al eliminar tarea');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (
      task: { id: number; title: string; description: string, completed: boolean },
      { getState, rejectWithValue }
    ) => {
      const state = getState() as { auth: { token: string | null } };
      console.log(task.completed)
      try {
        const response = await axios.put(
          `${API_URL}api/tasks/${task.id}`,
          { title: task.title, description: task.description, completed: task.completed},
          {
            headers: { Authorization: `Bearer ${state.auth.token}` },
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'Error al actualizar tarea');
      }
    }
  );

export default taskSlice.reducer;
