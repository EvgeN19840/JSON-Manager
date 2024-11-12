// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IReimbursement } from "@/const/types";

// ** Columns
import { ColumnsReimbursements } from "./columnsCustomIncome";

export const CustomIncomeTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const reimbursementData = (dataForDialog as { reimbursements?: IReimbursement[] })?.reimbursements || [];

  const rows: GridRowsProp = reimbursementData.map((reimbursement) => ({
    id: reimbursement.customBambooTableRowId,
    ...reimbursement,
  }));

  return (
    <Box>
      {reimbursementData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={ColumnsReimbursements()}
          autoHeight
          sx={{
            border: "1px solid #ccc",
            ".MuiDataGrid-cell": { padding: 2 },
          }}
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
          <Typography>No reimbursement data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
