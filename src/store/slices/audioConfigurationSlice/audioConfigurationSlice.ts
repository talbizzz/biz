import { createSlice } from '@reduxjs/toolkit'
import { AudioType, PerformerType } from '../../../types/AssetsTypes'

export const audioConfigurationSlice = createSlice({
  name: 'audioConfigurationSlice',
  initialState: {
    currentAudio: {
      uid: '',
      title: '',
      performers: [] as PerformerType[],
      url: '',
    },
  } as { currentAudio: AudioType },
  reducers: {
    setCurrentAudio: (state, action) => {
      state.currentAudio = action.payload as AudioType
    },
  },
})

export const { setCurrentAudio } = audioConfigurationSlice.actions

export default audioConfigurationSlice.reducer
