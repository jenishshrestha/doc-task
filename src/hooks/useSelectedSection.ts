import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleSection,
  selectAllSections,
  clearSelection,
  removeSelected,
} from "@/store/sections/selectedSectionsSlice";

/**
 * ========================================================================
 * useTheme Hook
 * @description Custom hook to access and toggle theme using Redux store.
 * ========================================================================
 */

const useSelectedSections = () => {
  const selectedIds = useAppSelector(
    (state) => state.sectionSelected.selectedIds,
  );

  const dispatch = useAppDispatch();

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

  const removeItem = (id: number) => {
    dispatch(removeSelected(id));
  };

  return {
    selectedIds,
    toggleSectionSelect,
    selectAll,
    areAllSelected,
    clearAll,
    removeItem,
  };
};

export default useSelectedSections;
