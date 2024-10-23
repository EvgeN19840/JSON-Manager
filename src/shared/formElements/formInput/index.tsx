// ** Forms Imports
import { Controller } from "react-hook-form";

// ** MUI Components
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// ** Types
import { FormInputProps } from "./types";




export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  control,
  errorMessage,
  type = "text",
  rules = {},
  ...rest
}) => {
  return (
    <FormControl fullWidth sx={{ pl: 0 }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label={label}
            value={value}
            onBlur={onBlur}
            type={type}
            onChange={onChange}
            error={Boolean(errorMessage)}
            {...rest}
          />
        )}
      />
      {errorMessage && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
