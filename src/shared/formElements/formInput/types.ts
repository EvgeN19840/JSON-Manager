// ** Forms Imports
import { FieldValues, Control, Path } from "react-hook-form";

// ** MUI
import { TextFieldProps } from "@mui/material/TextField";

export interface FormInputProps<TFieldValues extends FieldValues> extends Omit<TextFieldProps, 'variant' | 'size'> {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    errorMessage?: string;
    type?: string;
    rules?: object;
}
