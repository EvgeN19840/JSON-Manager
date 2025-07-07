// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useModal, useDataStateContext } from '@/pages/home/hooks'

// ** Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Schema
import { schema } from './schema'

// ** Types
import { ISystemBenefit } from '@/types/json'
import { IFormBenefitsProps } from './types'

// ** Dropdowns
import benifitNamesDropdown from '@/constants/dropdownLists/benifitNames/pension'

export const EditBenefits = () => {
  const { dataForDialog, closeDialog } = useModal() as {
    dataForDialog: ISystemBenefit | null
    closeDialog: () => void
  }

  const { handleSaveBenefit } = useDataStateContext()

  const defaultValues: IFormBenefitsProps = {
    name: dataForDialog?.name ?? '',
    id: dataForDialog?.id ?? ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IFormBenefitsProps>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: IFormBenefitsProps) => {
    handleSaveBenefit({ ...dataForDialog, ...data } as ISystemBenefit)
    closeDialog()
  }

  return (
    <Box>
      <FormWrapper title='Benefit' onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel>Benefit Name</InputLabel>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Benefit Name'
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
        </Box>

        {Object.keys(defaultValues)
          .filter(key => key !== 'name')
          .map(key => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IFormBenefitsProps}
                label={key}
                control={control}
                type='text'
                errorMessage={errors[key as keyof IFormBenefitsProps]?.message}
                disabled={key === 'id'}
              />
            </Box>
          ))}
      </FormWrapper>

      <FormFooter
        cancelButtonText='Cancel'
        actionButtonText='Save'
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source='general'
      />
    </Box>
  )
}
