import { ImportDataComponent, ExportDataComponent } from "./";
import { ITypeJSON } from "@/const/types";
import { CustomDialog } from "@/shared/components/customDialog";

interface IImportExportDialog {
  setData: (value: ITypeJSON) => void;
  open: boolean;
  onClose: () => void;
  source: string;
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
