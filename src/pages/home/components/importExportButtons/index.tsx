import { useDataStateContext } from "@/hooks/useDataStateContext";
import { IDialog } from "@/pages/home/components/importExportButtons/types";
import { Box, Button } from "@mui/material";

interface ImportExportButtonsProps {
  handleClickOpenFromGrid: (actionType: IDialog) => void;
}

export const ImportExportButtons: React.FC<ImportExportButtonsProps> = ({
  handleClickOpenFromGrid,
}) => {
  const { hasData } = useDataStateContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        mb: 1,
        gap: "1rem",
      }}
    >
      <Button
        variant="contained"
        onClick={() => handleClickOpenFromGrid("Import data")}
        sx={{ width: "50%" }}
      >
        Import Employee Data
      </Button>
      {hasData && (
        <Button
          variant="contained"
          onClick={() => handleClickOpenFromGrid("Export data")}
          sx={{ width: "50%" }}
        >
          Export
        </Button>
      )}
    </Box>
  );
};
