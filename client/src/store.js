import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./store/user/userSlice";
import allTasksSlice from "./store/allTasks/allTasksSlice";
import taskSlice from "./store/Task/taskSlice";

export const store = configureStore({
  reducer: {
    user:userSlice,
    tasks:allTasksSlice,
    task:taskSlice
  }
})