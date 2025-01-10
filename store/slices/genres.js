import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieGenres: [],
  tvGenres: [],
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setMovieGenres: (state, action) => {
      state.movieGenres = action.payload;
    },
    setTvGenres: (state, action) => {
      state.tvGenres = action.payload;
    },
  },
});

export const { setMovieGenres, setTvGenres } = genresSlice.actions;

export default genresSlice.reducer;