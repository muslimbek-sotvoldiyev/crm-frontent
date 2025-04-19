import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slices/authlice";
import AuthApi from "./service/authApi";
import api from "./service/api";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, AuthApi.middleware),
});


