import { configureStore } from "@reduxjs/toolkit";
import genreReducer from "./slices/genres";
import typeReducer from "./slices/activeType";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    genres: genreReducer,
    activeType: typeReducer,
    auth: authReducer,
  },
});