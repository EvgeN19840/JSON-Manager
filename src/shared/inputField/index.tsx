// ** MUI
import { TextField, TextFieldProps } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string | object;  
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder, ...rest }) => {

  const displayValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  return (
    <TextField
      multiline
      sx={{ width: "100%" }}
      placeholder={placeholder}
      value={displayValue} 
      onChange={onChange}
      {...rest}
    />
  );
};
