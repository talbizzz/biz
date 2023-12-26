import { createSlice } from '@reduxjs/toolkit'

export const loginStateSlice = createSlice({
  name: 'loginState',
  initialState: {
    userLoggedIn: false,
  },
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload
    },
  },
})

export const { setUserLoggedIn } = loginStateSlice.actions

export default loginStateSlice.reducer
