import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSection,
  selectAllSections,
  clearSelection,
} from "@/store/sections/selectedSectionsSlice";

/**
 * ========================================================================
 * useTheme Hook
 * @description Custom hook to access and toggle theme using Redux store.
 * ========================================================================
 */

const useSelectedSections = () => {
  const selectedIds = useSelector(
    (state: RootState) => state.sectionSelected.selectedIds,
  );
  const dispatch = useDispatch<AppDispatch>();

  // add/remove section id to state
  const toggleSectionSelect = (id: number) => {
    dispatch(toggleSection(id));
  };

  // handle select all
  const selectAll = (allIds: number[]) => {
    dispatch(selectAllSections(allIds));
  };

  // check if all sections are selected
  const areAllSelected = (totalCount: number) =>
    totalCount > 0 && selectedIds.length === totalCount;

  // if all are selected then clear all

  const clearAll = () => {
    dispatch(clearSelection());
  };

  return {
    selectedIds,
    toggleSectionSelect,
    selectAll,
    areAllSelected,
    clearAll,
  };
};

export default useSelectedSections;
