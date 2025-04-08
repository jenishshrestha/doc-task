import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SectionsState {
  selectedIds: number[];
}

// Initial State
const initialState: SectionsState = {
  selectedIds: [],
};

/**
 * ==============================================================================
 * Selected Section Slice
 * @description This slice manages the selected sections of the application.
 * ==============================================================================
 */
const sectionSelectedSlice = createSlice({
  name: "selectedIDs",
  initialState: initialState,
  reducers: {
    toggleSection: (state, action: PayloadAction<number>) => {
      const index = state.selectedIds.indexOf(action.payload);
      if (index === -1) {
        state.selectedIds.push(action.payload);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    selectAllSections: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = [...action.payload];
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    removeSelected: (state, action: PayloadAction<number>) => {
      const index = state.selectedIds.indexOf(action.payload);
      state.selectedIds.splice(index, 1);
    },
  },
});

export const {
  toggleSection,
  selectAllSections,
  clearSelection,
  removeSelected,
} = sectionSelectedSlice.actions;

export default sectionSelectedSlice.reducer;
