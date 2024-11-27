// ** Forms Imports
import { Controller, FieldValues } from "react-hook-form";

// ** MUI Components
import TextField from "@mui/material/TextField";

// ** Types
import { FormInputProps } from "./types";
import { Checkbox, FormControlLabel } from "@mui/material";

export const FormInput = <T extends FieldValues>({
  name,
  label,
  control,
  errorMessage,
  type = "text",
}: FormInputProps<T>) => {
  const formatLabel = (label: string) =>
    label
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
      .replace(/^./, (char) => char.toUpperCase());

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) =>
        type === "checkbox" ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={formatLabel(label)}
          />
        ) : (
          <TextField
            label={formatLabel(label)}
            value={value || ""}
            onChange={onChange}
            error={!!errorMessage}
            helperText={errorMessage}
            fullWidth
          />
        )
      }
    />
  );
};
