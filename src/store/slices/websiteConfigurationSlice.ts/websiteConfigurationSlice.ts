import { createSlice } from '@reduxjs/toolkit'
import { SectionsType, WebsiteType } from '../../../types/WebsiteFormatTypes'

export const websiteConfigurationSlice = createSlice({
  name: 'websiteConfiguration',
  initialState: {
    sections: [] as SectionsType[],
    websiteType: {} as WebsiteType,
  },
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload.data as SectionsType[]
    },
    setWebsiteType: (state, action) => {
      state.websiteType = action.payload as WebsiteType
    },
  },
})

export const { setSections, setWebsiteType } = websiteConfigurationSlice.actions

export default websiteConfigurationSlice.reducer
