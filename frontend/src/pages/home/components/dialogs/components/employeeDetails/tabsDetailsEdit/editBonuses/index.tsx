// ** MUI
import { Autocomplete, Box, FormControl, TextField } from '@mui/material'

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
                  <Controller
                    name='currencyCode'
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        options={currencyCode}
                        value={field.value}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label='Currency code'
                            error={!!errors.currencyCode}
                            helperText={errors.currencyCode?.message}
                            fullWidth
                          />
                        )}
                      />
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
