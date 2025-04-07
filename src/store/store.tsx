import { configureStore } from "@reduxjs/toolkit";

// "themeToggleReducer" is a custom name for the reducer that manages the theme toggle state
import themeToggleReducer from "./themeToggle/themeToggleSlice";

// "sectionsReducer" is a custom name for the reducer that manages the sections state
import sectionSelectedReducer from "./sections/selectedSectionsSlice";

import sectionsApi from "@/services/sectionsApi";

/**
 * ==============================================================================
 * Store Configuration
 * @description This is the main store configuration for the application.
 * ==============================================================================
 */
const store = configureStore({
  reducer: {
    themeToggle: themeToggleReducer,
    sectionSelected: sectionSelectedReducer,
    // Add sectionsApi reducer as well for handling RTK Query cache state
    [sectionsApi.reducerPath]: sectionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sectionsApi.middleware),
});

export default store;

// define TypeScript types for your Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
