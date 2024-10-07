import { Dialog, Box } from "@mui/material";
import { ITypeJSON } from "../../const/types";
import { ImportDataComponent } from "./importDataComponent";
import { ExportDataComponent } from "./exportDataComponent";

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
    <Dialog fullWidth sx={{ height: "100vh" }} open={open} onClose={onClose}>
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {renderContent()}
      </Box>
    </Dialog>
  );
};
