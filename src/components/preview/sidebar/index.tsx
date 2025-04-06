import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionsList from "./SectionsList";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-card text-card-foreground flex h-full w-[420px] shrink-0 flex-col rounded-xl border p-4 shadow-sm">
      {/* title */}
      <h2 className="mb-3">Fields</h2>

      {/* shadcn tabs */}
      <Tabs defaultValue="regularFields" className="flex-1">
        <TabsList className="flex">
          <TabsTrigger value="regularFields">Regular Fields</TabsTrigger>
          <TabsTrigger value="columnFields">Column Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="regularFields" className="relative">
          <div className="absolute top-0 left-0 h-full w-full overflow-y-auto">
            <div>Regular</div>
            <SectionsList />
          </div>
        </TabsContent>
        <TabsContent value="columnFields">Column</TabsContent>
      </Tabs>

      {/* buttons */}
      <div className="flex shrink-0 items-center justify-between gap-2">
        <Button variant="outline">Select All</Button>
        <Button variant="outline">Confirm</Button>
      </div>
    </div>
  );
};

export default Sidebar;
