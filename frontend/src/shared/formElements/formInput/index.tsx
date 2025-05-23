// ** Forms Imports
import { Controller, FieldValues } from "react-hook-form";

// ** MUI
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";

// ** Types
import { FormInputProps } from "./types";

export const FormInput = <T extends FieldValues>({
  name,
  label,
  control,
  errorMessage,
  type = "text",
  disabled = false,
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
            disabled={disabled}
            fullWidth
          />
        )
      }
    />
  );
};
