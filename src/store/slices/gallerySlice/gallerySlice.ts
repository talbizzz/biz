import { createSlice } from '@reduxjs/toolkit'
import { ImageType } from '../../../types/AssetsTypes'

export const gallerySlice = createSlice({
  name: 'gallerySlice',
  initialState: {
    currentImage: {},
  },
  reducers: {
    setCurrentImage: (state, action) => {
      state.currentImage = action.payload as ImageType
    },
  },
})

export const { setCurrentImage } = gallerySlice.actions

export default gallerySlice.reducer
