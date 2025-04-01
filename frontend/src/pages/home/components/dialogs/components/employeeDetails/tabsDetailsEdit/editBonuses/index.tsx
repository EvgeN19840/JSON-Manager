// ** MUI
import { Box } from '@mui/material'

// ** External Libraries
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import {
  useDataStateContext,
  useDefaultBonuses,
  useModal
} from '@/pages/home/hooks'

// ** Schema
import { schema } from './schema'

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
              <FormInput
                name={key as keyof IBonuses}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IBonuses]?.message}
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
