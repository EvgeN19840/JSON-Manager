import { Typography, Box } from "@mui/material";
import { FC } from "react";

export const Header: FC = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      bgcolor: "#78a19b",
      padding: "18px",
      borderBottom: `1px solid #00796B`,
    }}
  >
    <Typography variant="h6" sx={{ color: "#8cc8d1" }}>
      CayPay JSON Manager
    </Typography>
  </Box>
);
