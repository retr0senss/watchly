import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeType: "",
};

export const activeTypeSlice = createSlice({
  name: "activeType",
  initialState,
  reducers: {
    setActiveType: (state, action) => {
      state.activeType = action.payload;
    },
  },
});

export const { setActiveType } = activeTypeSlice.actions;

export default activeTypeSlice.reducer;