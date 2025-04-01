// ** MUI
import { TextFieldProps } from "@mui/material";

export interface InputFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
    value: string | object;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    noBorderRadius?: boolean;
}