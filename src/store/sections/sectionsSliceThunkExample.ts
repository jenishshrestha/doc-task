import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiResponse from "@/@types/sections";

//types for states
export type SectionStateTypes = {
  sectionJsonData: ApiResponse;
  loading: boolean;
  error: string | undefined | null;
};

// Initial State
const initialSectionStates: SectionStateTypes = {
  sectionJsonData: {} as ApiResponse,
  loading: false,
  error: null,
};

// Async thunk to fetch sections
//'<sliceName>/<actionName>'
export const fetchSections = createAsyncThunk(
  "section/fetchSections",
  async () => {
    const response = await axios.get("/api/sections");
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
  name: "section",
  initialState: initialSectionStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionJsonData = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sectionSlice.reducer;
