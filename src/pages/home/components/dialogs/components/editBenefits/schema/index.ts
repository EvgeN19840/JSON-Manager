// ** Yup
import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[A-Za-z0-9\s]+$/),
  id: yup.string().required()
});
