// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types and Columns
import { IDepositAccounts } from "@/const/types";
import { ColumnsAccounts } from "./columnsAccounts";

export const DepositAccountTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const depositAccountData = (dataForDialog as { depositAccounts?: IDepositAccounts[] })?.depositAccounts || [];


  const rows: GridRowsProp = depositAccountData.map((account) => ({
    id: account.customBambooTalbeRowId, 
    ...account,
  }));

  return (
    <Box>
      {depositAccountData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={ColumnsAccounts()}
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
          <Typography>No deposit accounts available.</Typography>
        </Box>
      )}
    </Box>
  );
};
