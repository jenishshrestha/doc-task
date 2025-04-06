import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//types for states
export type SectionStateTypes = {
  loading: boolean;
  sections: [];
  error: string | undefined | null;
};

// Initial State
const initialSectionStates: SectionStateTypes = {
  loading: false,
  sections: [],
  error: null,
};

// Async thunk to fetch sections
// "sections/fetchSections" = "slicename/reducername"
export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async () => {
    const response = await axios.get("/src/data/sections.json");
    return response.data;
  },
);

/**
 * ==============================================================================
 * Sections Slice
 * @description This slice manages the sections state of the application.
 * ==============================================================================
 */

const sectionSlice = createSlice({
  name: "sections",
  initialState: initialSectionStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sectionSlice.reducer;
