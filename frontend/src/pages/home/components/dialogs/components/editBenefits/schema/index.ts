// ** Yup
import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Benefit name is required')
    .trim()
    .matches(/^[A-Za-z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, 'Benefit name must only contain letters, numbers, and symbols (no Cyrillic letters)'), // Убраны избыточные escape-символы
  id: yup.string().required()
});
