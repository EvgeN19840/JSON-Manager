import { IDialog } from "@/pages/home/types";
import { Box, Button } from "@mui/material";


interface ButtonComponentProps {
  handleClickOpenFromGrid: (actionType: IDialog) => void;
  hasData: boolean;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  handleClickOpenFromGrid,
  hasData,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        mb: 1,
        gap: '1rem'
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
