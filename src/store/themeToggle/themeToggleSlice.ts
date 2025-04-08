import { createSlice } from "@reduxjs/toolkit";

// types for the theme toggle state
export type ThemeState = {
  mode: "light" | "dark";
};

// Initial State
const initialThemeState: ThemeState = {
  mode: "dark",
};

/**
 * ==============================================================================
 * Theme Toggle Slice
 * @description This slice manages the theme toggle state of the application.
 * ==============================================================================
 */

const themeToggleSlice = createSlice({
  name: "themeToggle",
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeToggleSlice.actions;
export default themeToggleSlice.reducer;
