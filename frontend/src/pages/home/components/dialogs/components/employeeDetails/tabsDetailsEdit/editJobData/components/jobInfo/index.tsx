// ** MUI
import { Autocomplete, Box, TextField } from '@mui/material'

// ** External Libraries
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultJobInfo, useModal } from '@/pages/home/hooks'

// ** Schema
import { jobInfoSchema } from '../../schema'

// ** Types
import { IJobInfo } from '@/types/json'

// ** Dropdowns
import jobTitles from '@/constants/dropdownLists/jobTitles'
import departments from '@/constants/dropdownLists/departments'
import divisions from '@/constants/dropdownLists/divisions'

export const JobInfo: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IJobInfo | null
  }

  const { handleClickOpenDialog } = useModal()
  const defaultValues = useDefaultJobInfo()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IJobInfo>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(jobInfoSchema)
  })

  const onSubmit = (formData: IJobInfo) => {
    handleSaveData({ ...dataForDialog, ...formData } as IJobInfo, 'jobInfo')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  const renderAutocomplete = (name: keyof IJobInfo, label: string, options: string[]) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          freeSolo
          options={options}
          value={field.value != null ? String(field.value) : ''}
          onChange={(_, newValue) => field.onChange(newValue)}
          onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
          renderInput={params => (
            <TextField {...params} label={label} error={!!errors[name]} helperText={errors[name]?.message} fullWidth />
          )}
        />
      )}
    />
  )

  return (
    <Box>
      <FormWrapper title='Job Info' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'jobTitle' ? (
                renderAutocomplete('jobTitle', 'Job title', jobTitles.sort())
              ) : key === 'department' ? (
                renderAutocomplete('department', 'Department', departments.sort())
              ) : key === 'division' ? (
                renderAutocomplete('division', 'Division', divisions.sort())
              ) : (
                <FormInput
                  name={key as keyof IJobInfo}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IJobInfo] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IJobInfo]?.message}
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
