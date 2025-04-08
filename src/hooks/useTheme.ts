import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/themeToggle/themeToggleSlice";

/**
 * ========================================================================
 * useTheme Hook
 * @description Custom hook to access and toggle theme using Redux store.
 * ========================================================================
 */

const useTheme = () => {
  const dispatch = useAppDispatch();

  // Get current mode from Redux: "light" or "dark"
  const mode = useAppSelector((state) => state.themeToggle.mode);

  // Toggle theme
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Boolean form for conditional rendering/styling
  const darkMode = mode === "dark";

  return {
    handleThemeToggle, // function to toggle theme
    darkMode, // true if mode is "dark"
    mode, // "light" or "dark"
  };
};

export default useTheme;
