// ** MUI
import { Autocomplete, Box, TextField } from '@mui/material'

// ** External Libraries
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultDepositAccounts, useModal } from '@/pages/home/hooks'

// ** Schema
import { schema } from './schema'

// ** Types
import { IDepositAccounts } from '@/types/json'

// ** Dropdowns
import bankNames from '@/constants/dropdownLists/bankNames'
import currencyCode from '@/constants/dropdownLists/currencyCode'
import accountType from '@/constants/dropdownLists/accountType'

export const EditDepositAccounts: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IDepositAccounts | null
  }

  const defaultValues = useDefaultDepositAccounts()
  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IDepositAccounts>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IDepositAccounts) => {
    handleSaveData({ ...dataForDialog, ...formData }, 'depositAccounts')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )
    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Deposit account' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'bank' || key === 'currencyCode' || key === 'accountType' ? (
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => {
                    const options =
                      key === 'bank'
                        ? bankNames
                        : key === 'currencyCode'
                        ? currencyCode
                        : accountType

                    const label =
                      key === 'bank'
                        ? 'Bank name'
                        : key === 'currencyCode'
                        ? 'Currency code'
                        : 'Account type'

                    return (
                      <Autocomplete
                        freeSolo
                        options={options}
                        value={field.value || ''}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={label}
                            error={!!errors[key as keyof IDepositAccounts]}
                            helperText={errors[key as keyof IDepositAccounts]?.message}
                            fullWidth
                          />
                        )}
                      />
                    )
                  }}
                />
              ) : (
                <FormInput
                  name={key as keyof IDepositAccounts}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IDepositAccounts] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IDepositAccounts]?.message}
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
