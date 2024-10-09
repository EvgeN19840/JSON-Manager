import { Box, Button } from "@mui/material";
import { IDialog } from "../../types";

interface IToolbarWithExportAndImportProps {
  handleClickOpenFromGrid: (actionType: IDialog) => void;
  hasData: boolean;
}

export const ToolbarWithExportAndImport: React.FC<
  IToolbarWithExportAndImportProps
> = ({ handleClickOpenFromGrid, hasData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        mb: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={() => handleClickOpenFromGrid("Import data")}
      >
        Import Employee Data
      </Button>
      {hasData && (
        <Button
          variant="contained"
          onClick={() => handleClickOpenFromGrid("Export data")}
        >
          Export
        </Button>
      )}
    </Box>
  );
};
