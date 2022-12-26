import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { AuthUserType } from '../../types/UserType'

type UserState = {
  user: AuthUserType
}

const initialState: UserState = {
  user: null,
}

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserAction: (state, { payload: user }: PayloadAction<AuthUserType>) => {
      state.user = user
    },
  },
})

const { setUserAction } = userReducer.actions

export const setUser = (user: AuthUserType) => (dispatch: Dispatch) => dispatch(setUserAction(user))

export default userReducer.reducer
