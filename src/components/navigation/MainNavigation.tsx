import PrivateRoute from 'components/PrivateRoute'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { RootState } from 'store/store'

const MainNavigation = () => {
  const { user } = useSelector(({ userReducer }: RootState) => ({
    user: userReducer.user,
  }))

  if (user) {
    return (
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <div>login</div>
            </PrivateRoute>
          }
          path="/"
        />
      </Routes>
    )
  }
  return <Navigate to="/login" replace />
}

export default React.memo(MainNavigation)
