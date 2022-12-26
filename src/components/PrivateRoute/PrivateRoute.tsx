import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

type Props = {
  children: React.ReactElement
}

const PrivateRoute = ({ children }: Props) => {
  const isAuth = useSelector((state: RootState) => state.userReducer.user)

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default React.memo(PrivateRoute)
