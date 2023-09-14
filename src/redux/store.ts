import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./api/authSlice";
import { bookApi } from "./api/bookApi";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSlice.middleware, bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
