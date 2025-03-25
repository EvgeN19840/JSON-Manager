import { Box, Typography } from "@mui/material";

// ** Types
import { FormWrapperProps } from "./types";

export const FormWrapper = ({
  onSubmit,
  children,
  title,
}: FormWrapperProps) => {
  return (
    <Box>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // height: "100vh",

          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 1,
              zIndex: 1000,
              backgroundColor: "white",
              padding: "1rem",
            }}
          >
            <Typography align="center" variant="h6">
              {title}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "1rem",
            }}
          >
            {children}
          </Box>
        </Box>
      </form>
    </Box>
  );
};
