import Button from 'components/common/uiComponents/Button/Button'
import Input from 'components/common/uiComponents/Input/Input'
import { AuthContext } from 'context/AuthContext'
import { useFormik } from 'formik'
import FbLogo from 'images/icons/fb.svg'
import GoogleLogo from 'images/icons/google.svg'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginSchema } from 'schemas'
import { UserType } from 'types/UserType'

import s from './AuthPage.module.scss'

const AuthPage = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      authContext.login({
        data: { email: values.email, password: values.password },
        onStart: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          navigate('/', { replace: true })
        },
        onError: (msg: string) => {
          setError(msg)
          setIsLoading(false)
        },
      })
    },
  })

  const sendFormHandler = () => {
    if (isValid) {
      handleSubmit()
    } else {
      setError('Введите email, Введите пароль')
    }
  }

  useEffect(() => {
    if (values.email !== '' && values.password !== '') {
      setError('')
    }
  }, [values.email, values.password])

  return (
    <section className={s.auth_container}>
      <form className={s.form}>
        <div className="title">Войти</div>
        <div className="subtitle">Добро пожаловать, рады видеть вас снова 👋</div>
        <div className={s.social_buttons}>
          <Button
            text="Войти через Facebook"
            onClick={() => {}}
            iconUrl={FbLogo}
            btnClassName={s.social_btn}
          />
          <Button
            text="Войти через Google"
            onClick={() => {}}
            iconUrl={GoogleLogo}
            btnClassName={s.social_btn}
          />
        </div>
        <div className={s.or}>или</div>
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
          <Input
            id="password"
            type="password"
            placeholder="Пароль"
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password || ''}
            touched={!!touched.password}
            formError={!!error}
          />
        </div>
        {error ? <div className="error">{error}</div> : <></>}
        <Button
          text="Войти в аккаунт"
          onClick={sendFormHandler}
          btnClassName={`btn ${s.btn}`}
          isLoading={isLoading}
        />
        <NavLink to="/password_recovery" className={s.link}>
          Забыли пароль?
        </NavLink>
      </form>
    </section>
  )
}

export default AuthPage
