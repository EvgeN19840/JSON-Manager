import { Dialog, Box } from "@mui/material";
import { ITypeJSON } from "../../const/types";
import { ImportDataComponent } from "./importDataComponent";
import { ExportDataComponent } from "./exportDataComponent";

interface IImportDataProps {
  setData: (value: ITypeJSON) => void;
  open: boolean;
  onClose: () => void;
  source: string;
  parsedData: string | null;
}

export const ImportData: React.FC<IImportDataProps> = ({
  setData,
  open,
  onClose,
  source,
  parsedData,
}) => {
  return (
    <Dialog fullWidth sx={{ height: "90vh" }} open={open} onClose={onClose}>
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {source === "Export data" && (
          <ExportDataComponent parsedData={parsedData} onClose={onClose} />
        )}
        {source === "Import data" && (
          <ImportDataComponent setData={setData} onClose={onClose} />
        )}
      </Box>
    </Dialog>
  );
};
