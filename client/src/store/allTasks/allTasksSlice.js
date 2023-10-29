import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";


const initialState = {
  isLoading:false,
  tasks:[]
}
// ${thunkAPI.getState().user.user.token}
export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (_, thunkAPI) => {
    try {
      const res = await customFetch.get("/tasks", {
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



const allTasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTasks.pending]: (state) => {
      state.isLoading = true
    },
    [getAllTasks.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log('===========sotre=========================');
      console.log(action.payload);
      console.log('====================================');
      state.tasks = action.payload.tasks
    },
    [getAllTasks.rejected]: (state) => {
      state.isLoading = false
    }
  },
});


export default allTasksSlice.reducer;

