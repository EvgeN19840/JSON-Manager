import { Theme } from "@mui/material";

export const StylesgridProps = {
  marginTop: 20,
  minHeight: "250px",
  width: "90vw",
  bgcolor: (theme: Theme) => theme.palette.grey[500],
}