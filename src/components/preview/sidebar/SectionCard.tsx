"use client";
import { SectionChild } from "@/@types/sections";
import { Checkbox } from "@/components/ui/checkbox";
import { getInitials } from "@/lib/stringUtils";
import { useMemo } from "react";

import { EllipsisVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// interface for props
interface SectionCardProps extends SectionChild {
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  const { id, label, content, isSelected, onToggle } = props;

  // function to get the initials of the label
  const initials = useMemo(() => getInitials(label), [label]);

  // fallback of color
  const defaultColor = "bg-primary border-primary-border";

  return (
    <label className="bg-muted flex items-start gap-3 rounded-md p-4 text-sm">
      <div
        className={`${defaultColor} w-[40px] shrink-0 rounded-md border-l-4 p-2 text-center text-xs`}
      >
        {initials}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div>{label}</div>
        <div className="text-xs">{content?.value}</div>
      </div>
      <div className="">
        <Checkbox
          id={`section-${id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(id)}
        />
      </div>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical size={16} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto min-w-0">
            <DropdownMenuLabel className="cursor-pointer">
              Remove
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </label>
  );
};

export default SectionCard;
