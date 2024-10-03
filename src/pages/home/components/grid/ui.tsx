// ** Types
import { ITypeJSON } from "../../const/types";

// ** Styles
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// ** Components
import { columns } from "./columns";

export const MyGrid: React.FC<{ data: ITypeJSON | null }> = ({ data }) => {
  return (
    <DataGrid
      rows={data ? data.employees : []}
      getRowId={(row) => row.eId}
      columns={columns}
      slots={{ toolbar: GridToolbar }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[3, 5, 10, 20, 100]}
      sx={{
        ...StylesgridProps,
      }}
    />
  );
};
