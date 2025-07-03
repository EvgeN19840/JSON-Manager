// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// ** External Libraries
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultBonuses, useModal } from '@/pages/home/hooks'

// ** Schema
import { schema } from './schema'

// ** Dropdowns
import currencyCode from '@/constants/dropdownLists/currencyCode'

// ** Types
import { IBonuses } from '@/types/json'

export const EditBonuses: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IBonuses | null
  }
  const defaultValues = useDefaultBonuses()

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IBonuses>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IBonuses) => {
    handleSaveData({ ...dataForDialog, ...formData } as IBonuses, 'bonuses')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Bonus' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'currencyCode' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Currency code</InputLabel>
                  <Controller
                    name='currencyCode'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Currency code'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {currencyCode.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : (
                <FormInput
                  name={key as keyof IBonuses}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IBonuses] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IBonuses]?.message}
                />
              )}
            </Box>
          ))}
      </FormWrapper>
      <FormFooter
        cancelButtonText='Cancel'
        actionButtonText='Save'
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source='employeeDetails'
      />
    </Box>
  )
}
