import { ITypeJSON } from "../../const/types";
import { StylesgridProps } from "./styles/gridProps";
import { DataGrid } from "@mui/x-data-grid";
import { Opendialog } from "../import-data/openDialog";
import { columns } from "./columns";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { EmployeeDataButton } from "../import-data/buttons/emploeeData";

export const MyGrid: React.FC<{ data: ITypeJSON | null }> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
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
          toolbar: () => (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                onClick={handleClickOpen}
                sx={{ m: 1, border: "1px solid #ccc" }}
              >
                Export
              </Button>
            </Box>
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
      <EmployeeDataButton  onClick={handleClickOpen} />

      <Opendialog open={openDialog} onClose={handleClose}  />
    </>
  );
};
