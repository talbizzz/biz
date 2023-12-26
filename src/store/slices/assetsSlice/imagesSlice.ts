import { createSlice } from '@reduxjs/toolkit'

export const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload?.data
    },
  },
})

export const { setImages } = imagesSlice.actions

export default imagesSlice.reducer
