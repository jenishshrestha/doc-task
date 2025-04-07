"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionsLists from "./SectionsLists";
import { ScrollArea } from "@/components/ui/scroll-area";

import useSelectedSections from "@/hooks/useSelectedSection";
import { useFetchSectionsQuery } from "@/services/sectionsApi";
import Loader from "@/components/loader";
import { formatRTKQueryError } from "@/lib/formatRtkError";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const { data: jsonData, error, isLoading } = useFetchSectionsQuery();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // useSelectedSections hook to get selected ids and toggle function
  const { selectedIds, selectAll, areAllSelected, clearAll } =
    useSelectedSections();

  // function to toggle select all and save the section ids
  const toggleSelectAll = () => {
    if (!jsonData?.data?.sections[0].children) return;
    const allIds = jsonData.data.sections[0].children.map((s) => s.id);
    if (areAllSelected(jsonData.data.sections[0].children.length)) {
      clearAll();
    } else {
      selectAll(allIds);
    }
  };

  // dummy functinality to handle confirm button
  const handleConfirm = () => {
    setIsConfirming(true);

    setTimeout(() => {
      setIsConfirming(false);
      setDialogOpen(false);
      toast.success("Fields confirmed and processed successfully!");
    }, 2000);
  };

  return (
    <div className="bg-card text-card-foreground flex h-full w-[420px] shrink-0 flex-col gap-2 rounded-xl border p-4 shadow-sm">
      {/* title */}
      <h2 className="mb-3">Fields</h2>

      {/* shadcn tabs */}
      <Tabs defaultValue="regularFields" className="flex-1">
        <TabsList className="flex">
          <TabsTrigger value="regularFields">Regular Fields</TabsTrigger>
          <TabsTrigger value="columnFields">Column Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="regularFields" className="relative">
          <div className="absolute top-0 left-0 h-full w-full">
            <ScrollArea className="h-full w-full">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p>Error: {formatRTKQueryError(error)}</p>
              ) : (
                <SectionsLists data={jsonData} />
              )}
            </ScrollArea>
          </div>
        </TabsContent>
        <TabsContent value="columnFields">Column</TabsContent>
      </Tabs>

      {/* buttons */}
      <div className="flex shrink-0 items-center justify-between gap-2">
        <Button variant="outline" onClick={toggleSelectAll}>
          {areAllSelected(jsonData?.data.sections[0].children.length ?? 0)
            ? "Clear All"
            : "Select All"}
        </Button>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={selectedIds.length === 0}>
              Confirm ({selectedIds.length})
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to confirm the selected fields?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isConfirming}>
                Cancel
              </AlertDialogCancel>
              <Button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="dark:text-white"
              >
                {isConfirming ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  "Confirm"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Sidebar;
