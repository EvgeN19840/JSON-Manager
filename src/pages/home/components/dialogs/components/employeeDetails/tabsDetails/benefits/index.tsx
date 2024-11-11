// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types and Columns
import { IEmployeeBenefit } from "@/const/types";
import { ColumnsBenefit } from "./columnsBenefit";

export const BenefitsTab: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null;
  };
  const benefitsData = (dataForDialog as { benefits?: IEmployeeBenefit[] })?.benefits || [];

  const rows: GridRowsProp = benefitsData?.map((benefit) => ({
    ...benefit,
  })) || [];

  return (
    <Box>
      {benefitsData && benefitsData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={ColumnsBenefit()}
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
          <Typography>No benefits data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
