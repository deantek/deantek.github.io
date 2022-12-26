import { configureStore } from '@reduxjs/toolkit'

import userSlice from './reducers/userSlice'

const store = configureStore({
  reducer: {
    userReducer: userSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
