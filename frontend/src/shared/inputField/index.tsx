// ** MUI
import { TextField } from '@mui/material'

// ** Types
import { InputFieldProps } from './types'

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  noBorderRadius = false,
  ...rest
}) => {
  const displayValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2)

  return (
    <TextField
      multiline
      sx={{
        width: '100%',
        ...(noBorderRadius && { '& .MuiOutlinedInput-root': { borderRadius: 0 } })
      }}
      placeholder={placeholder}
      value={displayValue}
      onChange={onChange}
      {...rest}
    />
  )
}
