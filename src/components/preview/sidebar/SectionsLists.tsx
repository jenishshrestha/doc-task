"use client";

import SectionCard from "./SectionCard";
import { useSelectedSections } from "@/hooks/useSection";
import { useAppSelector } from "@/store/hooks";

/**
 * ==============================================================================
 * Sections List Component
 * @description This component displays a list of sections in the sidebar.
 * ==============================================================================
 */
const SectionsLists: React.FC = () => {
  const sectionsLists = useAppSelector((state) => state.sectionsLists.sections);

  // useSelectedSections hook to get selected ids and toggle function
  const { toggleSectionSelect, selectedIds } = useSelectedSections();

  return (
    <div>
      {sectionsLists.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {sectionsLists.map((section) => (
            <li key={section.id}>
              <SectionCard
                {...section}
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
