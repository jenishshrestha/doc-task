import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ApiResponse from "@/@types/sections";

// Define the API service
const sectionsApi = createApi({
  reducerPath: "sectionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    fetchSections: builder.query<ApiResponse, void>({
      query: () => "sections",
    }),
  }),
});

// Export the auto-generated hook for the `fetchSections` query
// based on query: () => 'sections',
export const { useFetchSectionsQuery } = sectionsApi;
export default sectionsApi;
