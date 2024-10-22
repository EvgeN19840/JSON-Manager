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
          display: "flex",
          flexDirection: "column",
        
          bgcolor: theme.palette.background.default,
        }}
      >
        <Container
          disableGutters
          maxWidth={false}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};
