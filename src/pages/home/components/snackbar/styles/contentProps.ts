import { Theme } from "@mui/material";

export const StylesContentProps = {
  bgcolor: (theme: Theme) => theme.palette.success.main,
  color: (theme: Theme) => theme.palette.info.light,
}