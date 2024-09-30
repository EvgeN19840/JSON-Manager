// ** Types

// ** Styles
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

// ** Components
import { IRows } from "./types";

export const MyGrid: React.FC<DataGridProps<IRows>> = ( {...props}) => (
  <DataGrid
    rows={props.rows}
    columns={props.columns}
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
