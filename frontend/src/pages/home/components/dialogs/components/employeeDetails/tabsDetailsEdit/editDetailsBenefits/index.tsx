// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Forms Imports
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'

// ** Schema
import { schema } from './schema'

// ** Types
import { IEmployeeBenefit, ISystemBenefit } from '@/types/json'
import { useDefaultEmployeeBenefit } from '@/pages/home/hooks/useDefaultData'

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
        {Object.keys(defaultValues).map(key => (
          <Box key={key} mb={2}>
            <FormInput
              name={key as keyof IEmployeeBenefit}
              label={key}
              control={control}
              type={typeof defaultValues[key as keyof IEmployeeBenefit] === 'boolean' ? 'checkbox' : 'text'}
              errorMessage={errors[key as keyof IEmployeeBenefit]?.message}
            />
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
