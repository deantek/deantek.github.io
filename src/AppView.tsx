import MainNavigation from 'components/navigation/MainNavigation'
import AuthPage from 'components/pages/AuthPage'
import PassRecoveryPage from 'components/pages/PassRecoveryPage'
import RegisterPage from 'components/pages/RegisterPage'
import { userDetail } from 'context/AuthContext/fakeApi'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { setUser } from 'store/reducers/userSlice'

import s from './AppView.module.scss'
import Header from './components/common/Header/Header'

const AppView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userMail = localStorage.getItem('user')
        if (userMail) {
          if (userMail === 'example@example.com') {
            setUser(userDetail)(dispatch)
          } else {
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    bootstrapAsync().finally(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <>
      <div className={s.app_container}>
        <Header />
        <Routes>
          <Route index path="login" element={<AuthPage />} />
          <Route path="password_recovery" element={<PassRecoveryPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="offerta" element={<div>офферта</div>} />
          <Route path="/*" element={<MainNavigation />} />
        </Routes>
      </div>
    </>
  )
}

export default React.memo(AppView)
