// ** React
import { FC } from "react";

// ** MUI
import { Typography, AppBar, Toolbar } from "@mui/material";

// ** Theme
import { useTheme } from "@mui/material/styles";

export const HeaderTitle: FC = () => {
  const theme = useTheme();
  return (
    <AppBar position="fixed" sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CayPay JSON Manager
        </Typography>
      </Toolbar>
    </AppBar>

  );
};
