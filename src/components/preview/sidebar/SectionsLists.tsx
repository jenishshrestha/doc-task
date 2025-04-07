"use client";

import SectionCard from "./SectionCard";
import useSelectedSections from "@/hooks/useSelectedSection";
import { useEffect } from "react";
import ApiResponse from "@/@types/sections";

interface SectionsListsProps {
  data: ApiResponse | undefined;
}

/**
 * ==============================================================================
 * Sections List Component
 * @description This component displays a list of sections in the sidebar.
 * ==============================================================================
 */
const SectionsLists: React.FC<SectionsListsProps> = (props) => {
  const { data: jsonData } = props;

  // useSelectedSections hook to get selected ids and toggle function
  const { toggleSectionSelect, selectedIds } = useSelectedSections();

  useEffect(() => {
    console.log("Fetched Data:", selectedIds);
  }, [selectedIds]);

  return (
    <div>
      {jsonData && jsonData?.data?.sections[0].children.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {jsonData?.data?.sections[0].children.map((section, index) => (
            <li key={section.id}>
              <SectionCard
                {...{ ...section, index }}
                isSelected={selectedIds.includes(section.id)}
                onToggle={() => toggleSectionSelect(section.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default SectionsLists;
