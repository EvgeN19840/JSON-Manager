// ** Forms Imports
import { FieldValues, useForm } from "react-hook-form";

// ** MUI
import { Box } from "@mui/material";

// ** Types
import { FormWrapperProps } from "./types";

export const FormWrapper = <T extends FieldValues>({
  onSubmit,
  children,
}: FormWrapperProps<T>) => {
  const { handleSubmit } = useForm<T>({
    mode: "onSubmit",
  });

  return (
    <Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
