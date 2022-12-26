import Button from 'components/common/uiComponents/Button/Button'
import Input from 'components/common/uiComponents/Input/Input'
import { getRequest } from 'context/AuthContext/fakeApi'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { passRecoverySchema } from 'schemas'

import { StepType } from '../RegisterPage'
import s from '../RegisterPage.module.scss'

type MailNotFoundProps = {
  setStep: React.Dispatch<React.SetStateAction<StepType>>
}

const MailNotFound = ({ setStep }: MailNotFoundProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const onSubmit = async () => {
    setIsLoading(true)
    const fakeReq = await getRequest()
    if (fakeReq) {
      setIsLoading(false)
      setStep('confirm')
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
    <form className={`${s.form} ${s.no_mail}`}>
      <div className="title">Мне не пришло письмо</div>
      <div className={`subtitle ${s.subtitle}`}>
        Письмо может прийти с задержкой в 5-10 минут. Также проверьте разные папки почтового ящика
        (актуально для gmail.com) и папку "Спам".Если письмо все же не пришло, повторите попытку или
        напишите об этом в тех.поддержку <span>support@livedune.ru</span> и мы активируем ваш
        аккаунт.
      </div>
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
        text="Отправить заново"
        onClick={sendFormHandler}
        btnClassName={`btn ${s.btn}`}
        isLoading={isLoading}
      />
      <div className={s.link} onClick={() => setStep('confirm')}>
        Отменить
      </div>
    </form>
  )
}

export default MailNotFound
