import React from 'react'
import { Spinner } from 'react-activity'
import 'react-activity/dist/Spinner.css'

import s from './Loader.module.scss'

type Props = {
  color?: string
  size?: number
  containerClassName?: string
  withoutMargin?: boolean
}

const Loader = ({ color, size, containerClassName, withoutMargin }: Props) => {
  return (
    <div
      className={`${s.loader_container} ${withoutMargin ? s.without_margin : ''} ${
        containerClassName || ''
      }`}
    >
      <Spinner color={color || '#ff7a00'} size={size || 32} speed={1} animating />
    </div>
  )
}

export default React.memo(Loader)
