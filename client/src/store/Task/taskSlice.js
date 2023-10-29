import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getAllTasks } from "../allTasks/allTasksSlice";

const initialState = {
  isLoading: false,
  isEditing: false,
  editJobId: '',
  status: 'pending',
  description:'',
  title:''
};

export const createTask = createAsyncThunk(
  "task/createTask",
  async (task, thunkAPI) => {
    try {
      const res = await customFetch.post("/tasks", task, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const editTask = createAsyncThunk(
  "task/editTask",
  async ({taskId , task}, thunkAPI) => {
    try {
      const res = await customFetch.patch(`/tasks/${taskId}`, task, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);


export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const res = await customFetch.delete(`/tasks/${taskId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllTasks())
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
);


const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createTask.pending]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Task Created");
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },


    [deleteTask.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Task deleted");
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },


    [editTask.pending]: (state) => {
      state.isLoading = true;
    },
    [editTask.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Task Modified...');
    },
    [editTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {setEditJob} = taskSlice.actions
export default taskSlice.reducer;
