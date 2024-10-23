import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup.string().required().matches(/^[A-Za-z0-9\s]+$/),
  lastName: yup.string().required().matches(/^[A-Za-z0-9\s]+$/)
})