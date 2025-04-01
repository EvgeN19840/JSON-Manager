// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// ** External Libraries
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import {
  useDataStateContext,
  useDefaultSalary,
  useModal
} from '@/pages/home/hooks'

// ** Dropdowns
import payPeriodDropdown from './payPeriodDropdown'
import salaryRateDropdown from './salaryRateDropdown'

// ** Schema
import { salarySchema } from '../../schema'

// ** Types
import { ISalary } from '@/types/json'


export const Salary: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ISalary | null
  }
  const defaultValues = useDefaultSalary()

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ISalary>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(salarySchema)
  })

  const onSubmit = (formData: ISalary) => {
    handleSaveData({ ...dataForDialog, ...formData } as ISalary, 'salary')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Salary' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'payPeriod' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Pay Period</InputLabel>
                  <Controller
                    name='payPeriod'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Pay Period'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {payPeriodDropdown.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : key === 'salaryRatePeriod' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Rate Period</InputLabel>
                  <Controller
                    name='salaryRatePeriod'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Rate Period'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {salaryRateDropdown.map(option => (
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
                  name={key as keyof ISalary}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof ISalary] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof ISalary]?.message}
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
