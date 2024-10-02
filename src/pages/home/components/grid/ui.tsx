// ** Types
import { ITypeJSON } from "../../const/types";

// ** Styles
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";

// ** Components
import { columns } from "./columns";

export const MyGrid: React.FC<{ data: ITypeJSON | null }> = ({ data }) => {
  return (
    <DataGrid
      rows={data ? data.employees : []}
      getRowId={(row) => row.eId}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 3,
          },
        },
      }}
      pageSizeOptions={[20]}
      sx={{
        ...StylesgridProps,
      }}
    />
  );
};
