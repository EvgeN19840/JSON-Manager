import { Box, Typography } from "@mui/material";


// ** Types
import { FormWrapperProps } from "./types";

export const FormWrapper = ({ onSubmit, children, title }: FormWrapperProps) => {

  return (
    <Box>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography align="center" variant="h6">
            {title}
          </Typography>
          {children}
        </Box>
      </form>
    </Box>
  );
};
