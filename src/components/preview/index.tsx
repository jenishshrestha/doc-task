import DocumentPreviewer from "./documentPreviewer";
import Sidebar from "./sidebar";

const Preview: React.FC = () => {
  return (
    <div className="flex flex-1 gap-4 overflow-hidden p-4">
      <DocumentPreviewer />
      <Sidebar />
    </div>
  );
};

export default Preview;
