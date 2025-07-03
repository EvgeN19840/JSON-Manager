// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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
    handleSaveData({ ...dataForDialog, ...formData } as IDepositAccounts, 'depositAccounts')
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
              {key === 'bank' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Bank name</InputLabel>
                  <Controller
                    name='bank'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Bank name'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {bankNames.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : key === 'currencyCode' ? (
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
