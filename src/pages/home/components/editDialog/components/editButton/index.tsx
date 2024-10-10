import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { EditButtonProps } from "../../types";

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <IconButton size="small" onClick={onClick}>
    <EditIcon />
  </IconButton>
);
