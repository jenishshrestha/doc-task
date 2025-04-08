import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state for the sections slice
const initialState = {
  hoveredId: 0,
};

const sectionHoveredSlice = createSlice({
  name: "sectionsHovered",
  initialState: initialState,
  reducers: {
    setHoveredID: (state, action: PayloadAction<number>) => {
      state.hoveredId = action.payload;
    },
  },
});

export default sectionHoveredSlice.reducer;
export const { setHoveredID } = sectionHoveredSlice.actions;
