import Loader from 'components/common/Loader'
import React from 'react'
import { NavLink } from 'react-router-dom'

import s from './Button.module.scss'

type ButtonProps = {
  text: string
  isLink?: boolean
  to?: string
  onClick?: () => void
  btnClassName?: string
  iconUrl?: string
  isLoading?: boolean
}

const Button = ({ text, btnClassName, onClick, iconUrl, isLink, to, isLoading }: ButtonProps) => {
  if (isLink) {
    return (
      <NavLink to={to || ''} className={`${s.btn} ${btnClassName || ''}`} onClick={onClick}>
        {iconUrl ? <img src={iconUrl} alt="" className={s.img} /> : <></>}
        <span>{text}</span>
      </NavLink>
    )
  }
  return (
    <button type="button" className={`${s.btn} ${btnClassName || ''}`} onClick={onClick}>
      {isLoading ? (
        <>
          <Loader color="#ffffff" size={16} withoutMargin containerClassName={s.loader} />
          <span>Отправка</span>
        </>
      ) : (
        <>
          {iconUrl ? <img src={iconUrl} alt="" className={s.img} /> : <></>}
          <span>{text}</span>
        </>
      )}
    </button>
  )
}

export default Button
