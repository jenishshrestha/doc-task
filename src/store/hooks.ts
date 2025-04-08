/**
 * =============================================================================
 * Fully typed hooks for Redux store
 * @description This file contains custom hooks for dispatching actions and
 * selecting state from the Redux store.
 * =============================================================================
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
