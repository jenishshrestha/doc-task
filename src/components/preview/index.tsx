"use client";
import { useFetchSectionsQuery } from "@/services/sectionsApi";
import DocumentPreviewer from "./documentPreviewer";
import Sidebar from "./sidebar";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { setSections } from "@/store/sections/sectionsSlice";

const Preview: React.FC = () => {
  /**
   * Handling the fetched data
   */
  const { data: jsonData, error, isLoading } = useFetchSectionsQuery();
  const dispatch = useAppDispatch();

  // set data to a global state
  useEffect(() => {
    dispatch(setSections(jsonData?.data?.sections[0].children ?? []));
  }, [dispatch, jsonData]);

  return (
    <div className="flex flex-1 gap-4 overflow-hidden p-4">
      <DocumentPreviewer isLoading={isLoading} error={error} />
      <Sidebar isLoading={isLoading} error={error} />
    </div>
  );
};

export default Preview;
