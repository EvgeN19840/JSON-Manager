// ** Yup
import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  birthDate: yup
    .string(),
  eId: yup
    .number()
    .required(),
})