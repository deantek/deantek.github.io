import MailImg from 'images/icons/mail.png'
import { useNavigate } from 'react-router'
import Button from 'components/common/uiComponents/Button/Button'

import s from '../PassRecoveryPage.module.scss'

const CompleteEmail = () => {
  const navigate = useNavigate()
  return (
    <div className={` ${s.form} ${s.complete}`}>
      <div className={s.img}>
        <img src={MailImg} alt="" />
      </div>
      <div className={s.title}>Письмо отправлено</div>
      <div className={s.subtitle}>
        На указанный вами e-mail было отправлено письмо для смены пароля
      </div>
      <Button
        text="Вернуться на главную"
        onClick={() => navigate('/')}
        btnClassName={`btn ${s.btn}`}
      />
    </div>
  )
}

export default CompleteEmail
