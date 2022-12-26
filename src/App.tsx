import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/store'
import { Authorization as AuthProvider } from './context/AuthContext'
import './app.scss'
import AppView from './AppView'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <AppView />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
