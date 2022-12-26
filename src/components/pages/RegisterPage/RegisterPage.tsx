import Button from 'components/common/uiComponents/Button/Button'
import Input from 'components/common/uiComponents/Input/Input'
import { getRequest } from 'context/AuthContext/fakeApi'
import { useFormik } from 'formik'
import FbLogo from 'images/icons/fb.svg'
import GoogleLogo from 'images/icons/google.svg'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { registerSchema } from 'schemas'
import { setUser } from 'store/reducers/userSlice'
import { RootState } from 'store/store'

import MailNotFound from './components/MailNotFound'
import s from './RegisterPage.module.scss'

export type StepType = 'register' | 'confirm' | 'mail'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const [isPromo, setIsPromo] = useState<boolean>(false)
  const [step, setStep] = useState<StepType>('register')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const user = useSelector((state: RootState) => state.userReducer.user)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      promo: '',
    },
    validationSchema: registerSchema,
    onSubmit: async () => {
      setIsLoading(true)
      const fakeReq = await getRequest()
      if (fakeReq) {
        setIsLoading(false)
        setUser({
          id: 2,
          name: values.name,
          email: values.email,
          password: values.password,
          promocode: values.promo,
        })(dispatch)
        setStep('confirm')
      }
    },
  })

  const sendFormHandler = () => {
    if (isValid) {
      handleSubmit()
    } else {
      setError('Введите email, Введите пароль, Введите имя')
    }
  }

  useEffect(() => {
    if (values.name !== '' && values.email !== '' && values.password !== '') {
      setError('')
    }
  }, [values.email, values.name, values.password])

  return (
    <section className={s.register_container}>
      {step === 'register' ? (
        <form className={s.form}>
          <div className="title">Регистрация</div>
          <div className="subtitle">Зарегистрируйся и получи доступ к аналитике аккаунтов.</div>
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
              id="name"
              type="text"
              placeholder="Имя"
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name || ''}
              touched={!!touched.name}
              formError={!!error}
            />
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
            {isPromo ? (
              <Input
                id="promo"
                type="text"
                placeholder="Промокод"
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.promo}
                error={''}
                touched={false}
                formError={false}
              />
            ) : (
              <div className={s.promo_text} onClick={() => setIsPromo(true)}>
                У меня есть промокод
              </div>
            )}
          </div>
          {error ? <div className="error">{error}</div> : <></>}
          <Button
            text="Создать аккаунт"
            onClick={sendFormHandler}
            btnClassName={`btn ${s.btn}`}
            isLoading={isLoading}
          />
          <div className={s.link}>
            Создавая аккаунт, я согласен с{' '}
            <span>
              <NavLink to="/offerta">условиями оферты</NavLink>
            </span>
          </div>
        </form>
      ) : step === 'confirm' ? (
        <div className={`${s.form} ${s.mail}`}>
          <div className="title">Подтвердите ваш e-mail</div>
          <div className={`subtitle ${s.subtitle}`}>
            {user?.name}, на ваш E-mail отправлено письмо со ссылкой для подтверждения. Перейдите по
            ней, чтобы активировать вашу учетную запись и получить 7 дней бесплатного доступа.
          </div>
          <Button text="Перейти к почте" onClick={() => {}} btnClassName={`btn ${s.btn}`} />
          <div className={s.link} onClick={() => setStep('mail')}>
            Мне не пришло письмо
          </div>
        </div>
      ) : step === 'mail' ? (
        <MailNotFound setStep={setStep} />
      ) : (
        <></>
      )}
    </section>
  )
}

export default RegisterPage
