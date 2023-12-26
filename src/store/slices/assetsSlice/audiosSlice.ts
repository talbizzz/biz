import { createSlice } from '@reduxjs/toolkit'

export const audiosSlice = createSlice({
  name: 'audios',
  initialState: {
    audios: [],
  },
  reducers: {
    setAudios: (state, action) => {
      state.audios = action.payload?.data
    },
  },
})

export const { setAudios } = audiosSlice.actions

export default audiosSlice.reducer
