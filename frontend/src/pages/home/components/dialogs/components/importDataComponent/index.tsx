import { useState } from 'react'
import { FormFooter } from '@/shared/formElements/formFooter'
import { InputField } from '@/shared/inputField'
import { findEmployeeByName } from '@/shared/utils/findEmployeeByName'
import { ITypeJSON } from '@/types/json'
import { Box, Typography, FormControl, MenuItem, Select } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { listTemplate } from '@/shared/utils/listTemplate'
import { assignMissingIds } from '@/shared/utils'
import { useNotification } from '@/pages/home/hooks/useNotification'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { useModal } from '@/pages/home/hooks/useModal'
import { useTabs } from '@/pages/home/hooks/useTabs'

const normalizeToJson = (input: string): string => {
  return input
    .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
    .replace(/'/g, '"')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']')
}

const isValidJson = (input: string): boolean => {
  try {
    JSON.parse(input)
    return true
  } catch {
    return false
  }
}

export const ImportDataComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const { showNotification } = useNotification()
  const { setData } = useDataStateContext()
  const { setDialogOpen } = useModal()
  const { control, watch } = useForm<{ firstName: string }>({
    mode: 'onSubmit'
  })
  const {  handleTabChange } = useTabs()
  const selectedName = watch('firstName')

  const handleImport = () => {
    const normalizedInput = normalizeToJson(inputValue)

    if (!isValidJson(normalizedInput)) {
      showNotification('Invalid data format. Please correct and try again.', 'error')
      return
    }

    try {
      const parsedData = JSON.parse(normalizedInput) as ITypeJSON
      assignMissingIds(parsedData, 'benefits')
      setData({
        employees: parsedData.employees,
        benefits: parsedData.benefits
      })
      setDialogOpen(false)
      setInputValue('')
    } catch (e) {
      console.error(e)
      showNotification('Invalid JSON data. Please correct and try again.', 'error')
    }
  }
  const handleSelectEmployee = (selectedName: string) => {
    if (!selectedName) return
    const selectedEmp = findEmployeeByName(selectedName)
    if (!selectedEmp) {
      showNotification('Select the name of the base employee!', 'error')
      return
    }
    setData({ employees: [selectedEmp], benefits: [...selectedEmp.benefits] })
    setDialogOpen(false)
    setInputValue('')
    handleTabChange(null, '1')
  }

  const isImportDisabled = !!inputValue || !!selectedName
  return (
    <Box>
      <Typography variant='h6' sx={{ textAlign: 'center', mt: 1 }}>
        Import Data
      </Typography>
      <Box sx={{ px: '1rem' }}>
        <InputField
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Paste your JSON data here'
          rows={20}
          disabled={!!selectedName}
        />
      </Box>
      <FormFooter
        cancelButtonText='Close'
        actionButtonText='Import'
        buttonAction={() => (selectedName ? handleSelectEmployee(selectedName) : handleImport())}
        showSecondButton={isImportDisabled}
        middleContent={
          <FormControl sx={{ flexGrow: 1, mx: 2 }} disabled={!!inputValue}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || ''}
                  onChange={e => field.onChange(e.target.value)}
                  sx={{ height: '40px' }}
                  displayEmpty
                >
                  <MenuItem value=''>{'No Template Employee Selected'}</MenuItem>
                  {listTemplate().employees.map((emp, index) => (
                    <MenuItem key={index} value={emp.firstName}>
                      {emp.firstName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        }
        source={"general"}
      />
    </Box>
  )
}
