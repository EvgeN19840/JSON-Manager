// ** MUI
import { Autocomplete, Box, TextField } from '@mui/material'

// ** Forms Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useModal, useDataStateContext, useDefaultEmployeeBasicInfo } from '@/pages/home/hooks'

// ** Schema
import { schema } from './schema'

// ** Types
import { IEmployeeBasicInfo } from '@/types/json'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Dropdowns
import currencyCode from '@/constants/dropdownLists/currencyCode'

export const EditPersonalTab: React.FC = () => {
  const { dataForDialog } = useModal() as { dataForDialog: IEmployeeBasicInfo | null }

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const defaultValues = useDefaultEmployeeBasicInfo()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IEmployeeBasicInfo>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IEmployeeBasicInfo) => {
    handleSaveData({ ...dataForDialog, ...formData } as IEmployeeBasicInfo, 'personal')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )
    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <Box>
        <FormWrapper title="Personal" onSubmit={handleSubmit(onSubmit)}>
          {(Object.keys(defaultValues) as Array<keyof IEmployeeBasicInfo>).map(key => (
            <Box mt={2} key={key}>
              {key === 'baseCurrencyCode' ? (
                <Controller
                  name="baseCurrencyCode"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={[...currencyCode]} 
                      value={field.value ?? ''}
                      onChange={(_, newValue) => field.onChange((newValue ?? '').toString().toUpperCase().slice(0, 3))}
                      onInputChange={(_, newInputValue) =>
                        field.onChange((newInputValue ?? '').toString().toUpperCase().slice(0, 3))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Base currency code"
                          inputProps={{ ...params.inputProps, maxLength: 3 }}
                          error={!!errors.baseCurrencyCode}
                          helperText={errors.baseCurrencyCode?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              ) : (
                <FormInput
                  name={key}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key]?.message}
                  disabled={key === 'eId'}
                />
              )}
            </Box>
          ))}
        </FormWrapper>
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 1000
        }}
      >
        <FormFooter
          cancelButtonText="Cancel"
          actionButtonText="Save"
          showSecondButton={isDirty}
          buttonAction={handleSubmit(onSubmit)}
          source="employeeDetails"
        />
      </Box>
    </Box>
  )
}
