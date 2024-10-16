import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { StylesgridProps } from "./styles/gridProps";

interface IMyGridProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  data?: T[];
}

export const MyGrid = <T extends GridValidRowModel>({
  data,
  columns,
}: IMyGridProps<T>) => {
  return (
    <DataGrid
      rows={data ?? []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getRowId={(row) => (row as any).eId || (row as any).id}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[3, 5, 10, 20, 100]}
      disableRowSelectionOnClick
      sx={{ ...StylesgridProps }}
    />
  );
};
