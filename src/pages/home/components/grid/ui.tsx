// ** Types
import { ITypeJSON } from "../../const/types";

// ** Styles
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";

// ** Components
import { columns } from "./columns";
import { Box } from "@mui/material";

export const MyGrid: React.FC<{ data: ITypeJSON | null }> = ({ data }) => {
  return (
    <DataGrid
      rows={data ? data.employees : []}
      getRowId={(row) => row.eId}
      columns={columns}
      slots={{ toolbar: () => <Box>12312</Box> }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[3, 5, 10, 20, 100]}
      sx={{...StylesgridProps}}
    />
  );
};
