// ** MUI
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

// ** Styles
import { StylesgridProps } from "./styles/gridProps";

interface IMyGridProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  data: T[];
}

export const MyGrid = <T extends GridValidRowModel>({
  data,
  columns,
}: IMyGridProps<T>) => {
  return (
    <Box sx={{ height: "100%", width: "100%",flexGrow: 1 }}>
      <DataGrid
        rows={data ?? []}
        getRowId={(row) => (row as T).eId || (row as T).id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[3, 5, 10, 20, 100]}
        disableRowSelectionOnClick
        sx={{ ...StylesgridProps }}
      />
    </Box>
  );
};
