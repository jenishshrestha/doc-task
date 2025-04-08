"use client";
import { SectionChild } from "@/@types/sections";
import { Checkbox } from "@/components/ui/checkbox";
import { getInitials } from "@/lib/stringUtils";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import { removeSection } from "@/store/sections/sectionsSlice";
import { useHoveredSection, useSelectedSections } from "@/hooks/useSection";
import setColor from "@/lib/colorUtils";

interface SectionCardProps extends SectionChild {
  isSelected: boolean;
  onToggle: (id: number) => void;
  index: number;
}

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  label,
  content,
  isSelected,
  onToggle,
  index,
}) => {
  const dispatch = useAppDispatch();
  const { removeItem } = useSelectedSections();
  const { updateHoveredID, hoveredID } = useHoveredSection();

  const removeSectionFromList = (id: number) => {
    dispatch(removeSection(id));
    removeItem(id);
  };

  const initials = getInitials(label);
  const defaultStyles = "bg-primary border-primary-border";
  const dynamicColor = setColor(index);

  const colorStyles = dynamicColor
    ? {
        background: `rgba(${dynamicColor}, 0.3)`,
        borderColor: `rgba(${dynamicColor})`,
      }
    : {};

  return (
    <div
      className={`bg-muted relative flex items-start gap-1 rounded-md p-4 text-sm transition ${hoveredID == id ? "!bg-accent" : ""}`}
      onMouseEnter={() => updateHoveredID(id)}
      onMouseLeave={() => updateHoveredID(0)}
    >
      <label
        htmlFor={`section-${id}`}
        className="flex w-full cursor-pointer items-start gap-3"
      >
        <div
          className={`${defaultStyles} w-[40px] shrink-0 rounded-md border-l-4 p-2 text-center text-xs`}
          style={colorStyles}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="font-medium">{label}</div>
          <div className="text-muted-foreground text-xs">
            {content?.value || "No content"}
          </div>
        </div>
        <div className="shrink-0 pt-1">
          <Checkbox
            id={`section-${id}`}
            checked={isSelected}
            onCheckedChange={() => onToggle(id)}
            aria-label={`Toggle selection for ${label}`}
          />
        </div>
      </label>

      <div className="top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={`Options for ${label}`}
              className="hover:bg-muted-foreground/10 focus-visible:ring-ring rounded p-1 focus:outline-none focus-visible:ring-2"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel
              role="button"
              tabIndex={0}
              className="focus-visible:ring-ring cursor-pointer focus:outline-none focus-visible:ring-2"
              onClick={() => removeSectionFromList(id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  removeSectionFromList(id);
                }
              }}
            >
              Remove
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SectionCard;
