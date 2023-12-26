import { createSlice } from '@reduxjs/toolkit'

export const youtubeVideosSlice = createSlice({
  name: 'youtubeVideos',
  initialState: {
    youtubeVideos: [],
  },
  reducers: {
    setYoutubeVideos: (state, action) => {
      state.youtubeVideos = action.payload?.data
    },
  },
})

export const { setYoutubeVideos } = youtubeVideosSlice.actions

export default youtubeVideosSlice.reducer
