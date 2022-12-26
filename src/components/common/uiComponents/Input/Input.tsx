import React, { useState } from 'react'

import s from './Input.module.scss'

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  error: string
  onBlur: {
    (e: React.FocusEvent<any, Element>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  touched: boolean
  formError?: boolean
  [x: string]: any
}

const Input = ({ onChange, value, error, onBlur, touched, formError, ...props }: InputProps) => {
  return (
    <>
      <input
        {...props}
        onChange={onChange}
        value={value}
        className={(error && touched) || formError ? 'input-error' : ''}
        onBlur={onBlur}
      />
      {error && touched && <div className="error">{error}</div>}
    </>
  )
}

export default Input
