import { SnackbarCloseReason } from "@mui/material"

export type MyButtonProps = {
  onClose: (_: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void
}