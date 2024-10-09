// ** Components
import { ExportDataComponent, ImportDataComponent } from "./components";
import { CustomDialog } from "../../../../shared/components/customDialog";

// ** Types
import { IDialog } from "../../types";
import { ITypeJSON } from "../../../../const/types";

interface IImportExportDialog {
  setData: (value: ITypeJSON) => void;
  open: boolean;
  onClose: () => void;
  source: IDialog;
  parsedData: string | null;
}

export const ImportExportDialog: React.FC<IImportExportDialog> = ({
  setData,
  open,
  onClose,
  source,
  parsedData,
}) => {
  const renderContent = () => {
    switch (source) {
      case "Export data":
        return (
          <ExportDataComponent parsedData={parsedData} onClose={onClose} />
        );
      case "Import data":
        return <ImportDataComponent setData={setData} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <CustomDialog open={open} onClose={onClose} children={renderContent()} />
  );
};
