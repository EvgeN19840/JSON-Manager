import { ITypeJSON } from "../../const/types";
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import { ToolbarWithExportAndImport } from "./toolbar";

interface MyGridProps {
  handleClickOpenFromGrid: () => void;
  data: ITypeJSON | null;

}

export const MyGrid: React.FC<MyGridProps> = ({
  data,
  handleClickOpenFromGrid,
}) => {
  return (
    <DataGrid
      rows={data?.employees ?? []}
      getRowId={(row) => row.eId}
      columns={columns}
      slots={{
        toolbar: () => (
          <ToolbarWithExportAndImport
            handleClickOpenFromGrid={handleClickOpenFromGrid}
            hasData={data ? true : false}
          />
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
