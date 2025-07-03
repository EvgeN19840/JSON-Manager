// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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

  return (
    <Box>
      <FormWrapper title='Job Info' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'jobTitle' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Job title</InputLabel>
                  <Controller
                    name='jobTitle'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Job title'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {jobTitles.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : key === 'department' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Department</InputLabel>
                  <Controller
                    name='department'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Department'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {departments.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : key === 'division' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Division</InputLabel>
                  <Controller
                    name='division'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Division'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {divisions.map(option => (
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
