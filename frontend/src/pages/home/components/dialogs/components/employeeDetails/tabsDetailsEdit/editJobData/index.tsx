// // ** MUI
// import { Autocomplete, Box, TextField } from '@mui/material'

// // ** External Libraries
// import { Controller, useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Components
// import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// // ** Hooks
// import { useDataStateContext, useDefaultEmploymentStatus, useModal } from '@/pages/home/hooks'

// // ** Schema
// import { employmentStatusSchema } from './schema'
// import { salarySchema } from './schema'
// import { jobInfoSchema } from './schema'

// // ** Types
// import { IEmploymentStatus, ISalary, IJobInfo } from '@/types/json'

// // ** Dropdowns
// import employmentStatus from '@/constants/dropdownLists/employmentStatus'


// interface Props {
//   title: string
// }

// export const EditJobTab = ({ title }: Props) => {
//   const { dataForDialog } = useModal() as {
//     dataForDialog: IEmploymentStatus | null
//   }
//   const defaultValues = useDefaultEmploymentStatus()

//   const { handleClickOpenDialog } = useModal()
//   const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

//   let typeSchema

//   if (title === 'Edit status') {
//     typeSchema = employmentStatusSchema
//   } else if (title === 'Edit salary') {
//     typeSchema = salarySchema
//   } else if (title === 'Edit job') {
//     typeSchema = jobInfoSchema
//   }
//   type TabType = IEmploymentStatus | ISalary | IJobInfo
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isDirty }
//   } = useForm<TabType>({
//     defaultValues,
//     mode: 'onSubmit',
//     resolver: yupResolver(typeSchema)
//   })

//   const formattedTitle = title.split(' ').slice(1).toString()

//   const onSubmit = (formData: TabType) => {
//     handleSaveData({ ...dataForDialog, ...formData } as TabType, 'employmentStatus')
//     const updatedEmployees = data.employees.map(employee =>
//       employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
//     )

//     const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
//     handleClickOpenDialog('Details', updatedEmployee)
//   }

//   return (
//     <Box>
//       <FormWrapper title={formattedTitle} onSubmit={handleSubmit(onSubmit)}>
//         {Object.keys(defaultValues)
//           .filter(key => key !== 'customBambooTableRowId')
//           .map(key => (
//             <Box key={key} mb={2}>
//               {key === 'employmentStatus' ? (
//                 <Controller
//                   name='employmentStatus'
//                   control={control}
//                   render={({ field }) => (
//                     <Autocomplete
//                       freeSolo
//                       options={employmentStatus}
//                       value={field.value ?? ''}
//                       onChange={(_, newValue) => field.onChange(newValue)}
//                       onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
//                       renderInput={params => (
//                         <TextField
//                           {...params}
//                           label='Employment Status'
//                           error={!!errors}

//                           fullWidth
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               ) : (
//                 <FormInput
//                   name={key as keyof TabType}
//                   label={key}
//                   control={control}
//                   type={typeof defaultValues[key as keyof TabType] === 'boolean' ? 'checkbox' : 'text'}
//                   errorMessage={errors[key as keyof TabType]?.message}
//                 />
//               )}
//             </Box>
//           ))}
//       </FormWrapper>
//       <FormFooter
//         cancelButtonText='Cancel'
//         actionButtonText='Save'
//         showSecondButton={isDirty}
//         buttonAction={handleSubmit(onSubmit)}
//         source='employeeDetails'
//       />
//     </Box>
//   )
// }
