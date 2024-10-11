import { FC } from "react";
import { Typography } from "@mui/material";

export const HeaderTitle: FC = () => {
  return (
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      CayPay JSON Manager
    </Typography>
  );
};
