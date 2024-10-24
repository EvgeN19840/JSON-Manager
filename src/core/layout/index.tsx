// ** React
import { FC, ReactNode } from "react";

// ** MUI
import { Box, Container } from "@mui/material";

// ** Theme
import { useTheme } from "@mui/material/styles";

// ** Components
import { HeaderTitle } from "./components/headerTitle";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <HeaderTitle />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",

          bgcolor: theme.palette.background.default,
        }}
      >
        <Container disableGutters maxWidth={false}>
          {children}
        </Container>
      </Box>
    </>
  );
};
