// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types Columns
import { IBonuses } from "@/const/types";

// ** Columns
import { ColumnsBonuses } from "./columnsBonuses";



export const BonusesTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const bonusesData = (dataForDialog as { bonuses?: IBonuses[] })?.bonuses || [];

  const rows: GridRowsProp = bonusesData.map((bonus) => ({
    id: bonus.customBambooTalbeRowId,
    ...bonus,
  }));

  return (
    <Box>
      {bonusesData && bonusesData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={ColumnsBonuses()}  
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10rem",
            textAlign: "center",
          }}
        >
          <Typography>No bonus data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
