import { SnackbarCloseReason } from "@mui/material"

export type MySnackbarProps = {
  open: boolean,
  title: string,
  handleClose: (_: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void
}