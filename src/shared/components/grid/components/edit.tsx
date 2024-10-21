
// ** MUI
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// ** Types
import { GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";

export const EditButton = <T extends GridValidRowModel>({ handleEditClick, params }: { handleEditClick: (data: T) => void, params: GridRenderCellParams<T> }) => {
  return (
    <IconButton onClick={() => handleEditClick(params.row)}>
      <EditIcon />
    </IconButton>
  );
};