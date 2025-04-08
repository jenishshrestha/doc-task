/**
 * =============================================================================
 * Managing the sectionsList data retrieved via rtk query
 * @description This slice manages the sections state of the application.
 * =============================================================================
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionChild } from "@/@types/sections";

// initial state for the sections slice
const initialState = {
  sections: [] as SectionChild[],
};

// create slice
const sectionsSlice = createSlice({
  name: "sections",
  initialState: initialState,
  reducers: {
    setSections: (state, action: PayloadAction<SectionChild[]>) => {
      state.sections = action.payload;
    },
    removeSection: (state, action: PayloadAction<number>) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload,
      );
    },
  },
});

export default sectionsSlice.reducer;
export const { setSections, removeSection } = sectionsSlice.actions;
