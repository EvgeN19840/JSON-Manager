// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Forms Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"

// ** Schema
import { schema } from './schema'

// ** Hooks
import { useModal } from '@/hooks/useModal'
import { useDataStateContext } from '@/hooks/useDataStateContext'

// ** Types
import { IEmployee } from '@/const/types'
import { IFormProps } from './types'

export const EditUserName = () => {
  const { dataForDialog, closeDialog } = useModal();
  const { handleSaveEmployee } = useDataStateContext()
  const defaultValues = { firstName: (dataForDialog as IEmployee).firstName, lastName: (dataForDialog as IEmployee).lastName }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormProps>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })


  const onSubmit = (data: IFormProps) => {
    handleSaveEmployee({ ...dataForDialog as IEmployee, firstName: data.firstName, lastName: data.lastName } as IEmployee)
    closeDialog()
  }


  return (
    <Box>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}
        >
          <FormControl fullWidth sx={{ pl: 0 }}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  {...register('firstName')}
                  label='First Name'
                  value={value}
                  onBlur={onBlur}
                  type={'text'}
                  onChange={onChange}
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ pl: 0 }}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  {...register('lastName')}
                  label='Last Name'
                  value={value}
                  onBlur={onBlur}
                  type={'text'}
                  onChange={onChange}
                  error={Boolean(errors.lastName)}
                />
              )}
            />
            {errors.lastName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' onClick={closeDialog} id={'save_Modal'}>
              Cancel
            </Button>
            <Button variant='contained' type={'submit'} id={'save_Modal'}>
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}
