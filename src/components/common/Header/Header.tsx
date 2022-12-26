import React, { useContext, useMemo } from 'react'
import { ReactComponent as LogoSvg } from 'images/icons/logo.svg'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AuthContext } from 'context/AuthContext'

import Button from '../uiComponents/Button/Button'

import s from './Header.module.scss'

const Header = () => {
  const authContext = useContext(AuthContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isRecoveryPass = useMemo(() => pathname.indexOf('password_recovery') !== -1, [pathname])
  const isRegister = useMemo(() => pathname.indexOf('register') !== -1, [pathname])

  const isAuth = useSelector((state: RootState) => state.userReducer.user)

  const btnText: string = useMemo(
    () => (isRegister && !isAuth ? 'Войти' : isAuth ? 'Выйти' : 'Регистрация'),
    [isAuth, isRegister],
  )

  return (
    <header>
      <div className={s.logo} onClick={() => navigate('/')}>
        <LogoSvg />
      </div>
      {isRecoveryPass ? (
        <></>
      ) : (
        <div className={s.buttons_container}>
          {!isAuth && (
            <div className={s.text}>{isRegister ? 'Уже есть аккаунт?' : 'У вас нет аккаунта?'}</div>
          )}
          <Button
            text={btnText}
            isLink={!isAuth}
            to={isRegister ? '/login' : '/register'}
            onClick={() => {
              if (isAuth) {
                authContext.logout()
              }
            }}
            btnClassName={isAuth ? s.btn_logout : s.btn}
          />
        </div>
      )}
    </header>
  )
}

export default React.memo(Header)
