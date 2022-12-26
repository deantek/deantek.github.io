import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { UserType } from 'types/UserType'

import { setUser } from '../../store/reducers/userSlice'

import { getUser } from './fakeApi'

export type AuthContextType = {
  login: Function
  logout: Function
}

type AuthDataType = {
  data: LoginDataType
  onStart?: Function
  onSuccess?: Function
  onError?: Function
}

type LoginDataType = {
  email: string
  password: string
}

export const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
})

export const Authorization = ({ children }: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = React.useMemo(
    () => ({
      login: async ({ data, onError, onStart, onSuccess }: AuthDataType) => {
        if (onStart) {
          onStart()
        }
        let authDat = {
          email: data.email,
          password: data.password,
        }

        const fetchUser = getUser(authDat)

        fetchUser
          .then((response) => {
            if (onSuccess) {
              setUser(response)(dispatch)
              localStorage.setItem('user', JSON.stringify(response))
              onSuccess(response)
            }
          })
          .catch((error) => {
            if (onError) {
              setUser(null)(dispatch)
              localStorage.removeItem('user')
              onError(error)
            }
          })
      },
      logout: async (callback?: Function) => {
        localStorage.removeItem('user')
        setUser(null)(dispatch)
        navigate('/')
        if (callback) {
          callback()
        }
      },
    }),
    [dispatch, navigate],
  )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
