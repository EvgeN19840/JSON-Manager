
import { Box } from "@mui/material";
import { FormWrapperProps } from "./types";

export const FormWrapper = ({ onSubmit, children }: FormWrapperProps) => {
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
          {children}
        </Box>
      </form>
    </Box>
  );
};
