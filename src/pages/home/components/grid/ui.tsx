// ** Types
import { ITypeJSON } from "../../const/types";

// ** Styles
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";

// ** Components
import { columns } from "./columns";

export const MyGrid: React.FC<{ data: ITypeJSON | null }> = ({ data }) => (
  <DataGrid
    rows={data?.employees ?? []}
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
