import { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HeaderTitle } from "./components/headerTitle";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <HeaderTitle />
      <Box
        component="main"
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Container
          sx={{ flexGrow: 1 }}
          disableGutters
          maxWidth={false}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};
