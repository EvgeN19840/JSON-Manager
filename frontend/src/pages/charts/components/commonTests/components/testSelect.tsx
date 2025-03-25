import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

interface TestSelectProps {
  testsNames: string[]
  selectedTest: string
  onChange: (value: string) => void
}

export const TestSelect = ({ testsNames, selectedTest, onChange }: TestSelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='test-select-label'>Test</InputLabel>
      <Select labelId='test-select-label' id='test-select' value={selectedTest} label='Test' onChange={handleChange}>
        <MenuItem value='AllTest'>All Test</MenuItem>
        {testsNames
          .sort((a, b) => {
            const aNumber = Number(a)
            const bNumber = Number(b)

            if (isNaN(aNumber) || isNaN(bNumber)) return 0
            return aNumber - bNumber
          })
          .map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
