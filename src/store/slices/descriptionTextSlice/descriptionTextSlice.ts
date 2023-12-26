import { createSlice } from '@reduxjs/toolkit'

export const descriptionText = createSlice({
  name: 'descriptionText',
  initialState: {
    descriptionText: { textDE: '', textEN: '', image: '' },
  },
  reducers: {
    setDescriptionText: (state, action) => {
      state.descriptionText = action.payload.data
    },
    setTextDE: (state, action) => {
      state.descriptionText.textDE = action.payload.data
    },
    setTextEN: (state, action) => {
      state.descriptionText.textEN = action.payload.data
    },
    setImage: (state, action) => {
      state.descriptionText.image = action.payload.data
    },
  },
})

export const { setDescriptionText, setTextDE, setTextEN, setImage } = descriptionText.actions

export default descriptionText.reducer
