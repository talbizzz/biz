import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      uid: '',
      email: '',
      familyName: '',
      fullName: '',
      name: '',
      profession: '',
      additionalData: [],
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
