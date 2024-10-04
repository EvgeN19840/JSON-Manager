import { ITypeJSON } from "../../const/types";
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import { Box } from "@mui/material";
import { ExportButtons } from "../buttons/exportButton";

export const MyGrid: React.FC<{
  handleClickOpenFromGrid: () => void;
  data: ITypeJSON | null;
}> = ({ data, handleClickOpenFromGrid }) => {

  return (
    <DataGrid
      rows={data?.employees ?? []}
      getRowId={(row) => row.eId}
      columns={columns}
      slots={{
        toolbar: () =>
          data ? (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <ExportButtons onClick={handleClickOpenFromGrid} />
            </Box>
          ) : (
            <Box sx={{ minHeight: "50px" }}></Box>
          ),
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[3, 5, 10, 20, 100]}
      sx={{ ...StylesgridProps }}
    />
  );
};
