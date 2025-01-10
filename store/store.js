import { configureStore } from "@reduxjs/toolkit";
import genreReducer from "./slices/genres";
import typeReducer from "./slices/activeType";

export const store = configureStore({
  reducer: {
    genres: genreReducer,
    activeType: typeReducer,
  },
});