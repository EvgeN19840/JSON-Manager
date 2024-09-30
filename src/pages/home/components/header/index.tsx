import { Typography } from "@mui/material"
import { FC, memo } from "react"

export const Header: FC<{ title: string }> = memo((props) => (
  <Typography>
    {props.title}
  </Typography>
)
)