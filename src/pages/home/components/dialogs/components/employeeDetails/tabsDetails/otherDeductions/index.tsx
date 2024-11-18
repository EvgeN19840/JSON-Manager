// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IOtherDeduction } from "@/const/types";

// ** Columns
import { ColumnsDeductions } from "./columnsDeductions";

export const OtherDeductionTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const otherDeductionData =(dataForDialog as { otherDeductions?: IOtherDeduction[] })?.otherDeductions || [];

  const rows: GridRowsProp = otherDeductionData.map((deduction) => ({
    id: deduction.customBambooTableRowId,
    ...deduction,
  }));

  return (
    <Box>
      {otherDeductionData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={ColumnsDeductions()}
        
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
          <Typography>No deduction data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
