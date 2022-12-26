import Button from 'components/common/uiComponents/Button/Button'
import Input from 'components/common/uiComponents/Input/Input'
import { NavLink } from 'react-router-dom'
import PassImg from 'images/icons/pass.png'
import { useEffect, useState } from 'react'
import { passRecoverySchema } from 'schemas'
import { useFormik } from 'formik'
import { getRequest } from 'context/AuthContext/fakeApi'

import s from './PassRecoveryPage.module.scss'
import CompleteEmail from './components/CompleteEmail'

const PassRecoveryPage = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const onSubmit = async () => {
    setIsLoading(true)
    const fakeReq = await getRequest()
    if (fakeReq) {
      setIsLoading(false)
      setIsComplete(true)
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: passRecoverySchema,
    onSubmit: onSubmit,
  })

  const sendFormHandler = () => {
    if (isValid) {
      handleSubmit()
    } else {
      setError('Введите email')
    }
  }

  useEffect(() => {
    if (values.email !== '') {
      setError('')
    }
  }, [values.email])

  return (
    <section className={s.pass_container}>
      {!isComplete ? (
        <form className={s.form}>
          <div className={s.img}>
            <img src={PassImg} alt="" />
          </div>
          <div className={s.title}>Восстановить пароль</div>
          <div className={s.subtitle}>Введите e-mail, на который регистрировались ранее</div>
          <div className={s.inputs}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email || ''}
              touched={!!touched.email}
              formError={!!error}
            />
          </div>
          {error ? <div className="error">{error}</div> : <></>}
          <Button
            text="Отправить"
            onClick={sendFormHandler}
            btnClassName={`btn ${s.btn}`}
            isLoading={isLoading}
          />
          <NavLink to="/login" className={s.link}>
            Отменить
          </NavLink>
        </form>
      ) : (
        <CompleteEmail />
      )}
    </section>
  )
}

export default PassRecoveryPage
