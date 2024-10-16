// ** Components
import { ExportDataComponent, ImportDataComponent } from "./components";
import { CustomDialog } from "@/shared/components/customDialog";

// ** Types

import { useModal } from "@/hooks/useModal";

export const ImportExportDialog: React.FC = () => {
  const { source, isDialogOpen } = useModal();
  const renderContent = () => {
    switch (source) {
      case "Export data":
        return <ExportDataComponent />;
      case "Import data":
        return <ImportDataComponent />;
      default:
        return null;
    }
  };

  return <CustomDialog open={isDialogOpen} children={renderContent()} />;
};
