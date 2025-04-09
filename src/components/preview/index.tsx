"use client";
import { useFetchSectionsQuery } from "@/services/sectionsApi";
import DocumentPreviewer from "./documentPreviewer";
import Sidebar from "./sidebar";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useMemo } from "react";
import { setSections } from "@/store/sections/sectionsSlice";

import setColor from "@/lib/colorUtils";

const Preview: React.FC = () => {
  /**
   * Handling the fetched data
   */
  const { data: jsonData, error, isLoading } = useFetchSectionsQuery();
  const dispatch = useAppDispatch();

  // Process sections data with colors
  const processedSections = useMemo(() => {
    if (!jsonData?.data?.sections[0]?.children) return [];

    return jsonData.data.sections[0].children.map((section, index) => ({
      ...section,
      color: setColor(index), // Add color property to each section
    }));
  }, [jsonData]);

  // set data to a global state
  useEffect(() => {
    dispatch(setSections(processedSections));
  }, [dispatch, processedSections]);

  return (
    <div className="flex flex-1 gap-4 overflow-hidden p-4">
      <DocumentPreviewer isLoading={isLoading} error={error} />
      <Sidebar isLoading={isLoading} error={error} />
    </div>
  );
};

export default Preview;
