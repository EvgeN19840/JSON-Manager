import { FC, ReactNode } from "react";
import { Box, AppBar, Toolbar, Container, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HeaderTitle } from "../headerTitle";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
          <HeaderTitle />
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Container sx={{ flexGrow: 1 }}>{children}</Container>
      </Box>
    </>
  );
};
