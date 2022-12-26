import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Возможно вы ошиблись в указании почтового сервиса').required(''),
  password: yup.string().required(''),
})

export const registerSchema = yup.object().shape({
  name: yup.string().required(''),
  email: yup.string().email('Возможно вы ошиблись в указании почтового сервиса').required(''),
  password: yup.string().required(''),
  promo: yup.string(),
})

export const passRecoverySchema = yup.object().shape({
  email: yup.string().email('Возможно вы ошиблись в указании почтового сервиса').required(''),
})
