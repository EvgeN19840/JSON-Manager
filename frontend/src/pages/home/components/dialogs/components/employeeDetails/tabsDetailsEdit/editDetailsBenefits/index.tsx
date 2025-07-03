// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// ** External Libraries
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultEmployeeBenefit, useModal } from '@/pages/home/hooks'

// ** Dropdowns
import benifitNamesDropdown from '@/constants/dropdownLists/benifitNames'
import currencyCode from '@/constants/dropdownLists/currencyCode'

// ** Schema
import { schema } from './schema'

// ** Types
import { IEmployeeBenefit, ISystemBenefit } from '@/types/json'

export const EditDetailsBenefits = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null
  }

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, handleSaveBenefit, data, eIdSelectedEmployee } = useDataStateContext()

  const defaultValues = useDefaultEmployeeBenefit()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IEmployeeBenefit>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IEmployeeBenefit) => {
    const updatedDataForDialog = {
      ...dataForDialog,
      ...formData
    } as IEmployeeBenefit

    const updatedBenefit = {
      id: formData.id,
      name: formData.name
    } as ISystemBenefit

    handleSaveData(updatedDataForDialog, 'employeeBenefit')
    handleSaveBenefit(updatedBenefit)

    const updatedEmployees = data.employees.map(employee => {
      if (employee.eId === eIdSelectedEmployee) {
        const updatedBenefits = employee.benefits.map(benefit =>
          benefit.id === formData.id ? { ...benefit, ...formData } : benefit
        )
        return { ...employee, benefits: updatedBenefits }
      }
      return employee
    })

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Benefit' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'name' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Bank name</InputLabel>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Bank name'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {benifitNamesDropdown.map(option => (
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
              ) : key === 'companyCurrencyCode' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Company currency code</InputLabel>
                  <Controller
                    name='companyCurrencyCode'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Company currency code'
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
                  name={key as keyof IEmployeeBenefit}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IEmployeeBenefit] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IEmployeeBenefit]?.message}
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
