import { ITypeJSON } from "../../const/types";
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import { ToolbarWithExportAndImport } from "./toolbar";


export const MyGrid: React.FC<{
  handleClickOpenFromGrid: () => void;
  data: ITypeJSON | null;
  setData: (data: ITypeJSON) => void;
  openDialog: boolean;
  handleClickOpenFromEmployeeData: () => void;
  handleCloseDialog: () => void;
  source: string;
  parsedData: string | null;
}> = ({
  data,
  handleClickOpenFromGrid,
  setData,
  openDialog,
  handleClickOpenFromEmployeeData,
  handleCloseDialog,
  source,
  parsedData,
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
            setData={setData}
            openDialog={openDialog}
            handleClickOpenFromEmployeeData={handleClickOpenFromEmployeeData}
            handleCloseDialog={handleCloseDialog}
            source={source}
            parsedData={parsedData}
            hasData={!!data} 
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
