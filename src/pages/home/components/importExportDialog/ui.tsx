// ** Components
import { ExportDataComponent, ImportDataComponent } from "./components";
import { CustomDialog } from "@/shared/components/customDialog";

// ** Types

import { IDialog } from "../../types";

interface IImportExportDialog {
  open: boolean;
  onClose: () => void;
  source: IDialog;
}

export const ImportExportDialog: React.FC<IImportExportDialog> = ({
  open,
  onClose,
  source,
}) => {
  const renderContent = () => {
    switch (source) {
      case "Export data":
        return <ExportDataComponent onClose={onClose} />;
      case "Import data":
        return <ImportDataComponent onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <CustomDialog open={open} onClose={onClose} children={renderContent()} />
  );
};
