// ** Forms Imports
import { Control } from "react-hook-form";

// ** MUI
import { TextFieldProps } from "@mui/material/TextField";

export interface FormInputProps extends Omit<TextFieldProps, 'variant' | 'size'> { 
    name: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    errorMessage?: string;
    type?: string;
    rules?: object;
}
