import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import { Box, Button } from "@mui/material";

export const ImportExportButtons: React.FC = () => {
  const { handleClickOpenFromGrid } = useModal();
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
