import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

interface ISelectProps {
  names: string[]
  selected: string
  onChange: (value: string) => void
  label: string
}

export const CustomSelect = ({ names, selected, onChange, label }: ISelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
    <FormControl sx={{ width: '100px' }}>
      <InputLabel>{label}</InputLabel>
      <Select value={selected} label='Test' onChange={handleChange}>
        <MenuItem value='AllTest'>All Test</MenuItem>
        {names
          .sort((a, b) => {
            const aNumber = Number(a)
            const bNumber = Number(b)

            if (isNaN(aNumber) || isNaN(bNumber)) return 0
            return aNumber - bNumber
          })
          .map(test => (
            <MenuItem key={test} value={test}>
              {test}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
