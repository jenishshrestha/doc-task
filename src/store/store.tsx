import { configureStore } from "@reduxjs/toolkit";

// "themeToggleReducer" is a custom name for the reducer that manages the theme toggle state
import themeToggleReducer from "./themeToggle/themeToggleSlice";

// "sectionsReducer" is a custom name for the reducer that manages the sections state
import sectionReducer from "./sections/sectionsSlice";

/**
 * ==============================================================================
 * Store Configuration
 * @description This is the main store configuration for the application.
 * ==============================================================================
 */
const store = configureStore({
  reducer: {
    // reducer to manage the theme toggle state
    themeToggle: themeToggleReducer,
    sections: sectionReducer,
  },
});

export default store;

// define TypeScript types for your Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
