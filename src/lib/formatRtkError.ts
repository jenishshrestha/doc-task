import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export function formatRTKQueryError(
  error: FetchBaseQueryError | SerializedError,
): string {
  if ("status" in error) {
    // FetchBaseQueryError (e.g., HTTP 404/500 errors)
    return "error" in error
      ? (error.error as string)
      : JSON.stringify(error.data);
  }

  // SerializedError (e.g., unexpected code exception)
  return error.message || "An unexpected error occurred";
}
