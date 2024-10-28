// ** Yup
import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required').matches(/^[A-Za-z0-9\s]+$/, 'First Name must only contain Latin letters, numbers, and symbols"'),
  lastName: yup.string().required('Last Name is required').matches(/^[A-Za-z0-9\s]+$/, 'Last Name must only contain Latin letters, numbers, and symbols"'),
  birthDate: yup
    .string()
    .required('Birth date is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Birth date must be in the format YYYY-MM-DD'
    ),
  eId: yup
    .number()
    .required()

})