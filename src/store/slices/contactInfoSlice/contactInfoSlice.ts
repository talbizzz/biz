import { createSlice } from '@reduxjs/toolkit'

export const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState: {
    contactInfo: {
      address: '',
      socialMedia: { instagram: '', email: '', additionalSocialMedia: [] },
      additionalContactData: [],
    },
  },
  reducers: {
    setContactInfo: (state, action) => {
      state.contactInfo = action.payload.data
    },
    setAdditionalSocialMedia: (state, action) => {
      state.contactInfo.socialMedia.additionalSocialMedia = action.payload.data
    },
    setAdditionalContactData: (state, action) => {
      state.contactInfo.additionalContactData = action.payload.data
    },
    setAddress: (state, action) => {
      state.contactInfo.address = action.payload.data
    },
    setSocialMedia: (state, action) => {
      state.contactInfo.socialMedia = action.payload.data
    },
  },
})

export const {
  setContactInfo,
  setAdditionalContactData,
  setAdditionalSocialMedia,
  setAddress,
  setSocialMedia,
} = contactInfoSlice.actions

export default contactInfoSlice.reducer
