import { configureStore } from "@reduxjs/toolkit";
import { todosApiSlice } from "./todosApiSlice";

export const store = configureStore({
  reducer: {
    [todosApiSlice.reducerPath]: todosApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(todosApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
