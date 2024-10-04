import { ITypeJSON } from "../../const/types";
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";
import { Opendialog } from "../import-data/openDialog";
import { columns } from "./columns";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { EmployeeDataButton } from "../import-data/buttons/emploeeData";

export const MyGrid: React.FC<{
  data: ITypeJSON | null;
  setData: (value: ITypeJSON) => void;
}> = ({ data, setData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [fromGrid, setFromGrid] = useState(false);

  const handleClickOpenFromGrid = () => {
    setOpenDialog(true);
    setFromGrid(true);
  };

  const handleClickOpenNotFromGrid = () => {
    setOpenDialog(true);
    setFromGrid(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <DataGrid
        rows={data ? data.employees : []}
        getRowId={(row) => row.eId}
        columns={columns}
        slots={{
          toolbar: () =>
            data ? (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button
                  onClick={handleClickOpenFromGrid}
                  sx={{ m: 1, border: "1px solid #ccc" }}
                >
                  Export
                </Button>
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
      <EmployeeDataButton onClick={handleClickOpenNotFromGrid} />

      <Opendialog
        open={openDialog}
        onClose={handleClose}
        fromGrid={fromGrid}
        setData={setData}
      />
    </>
  );
};
