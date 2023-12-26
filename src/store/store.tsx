import { configureStore } from '@reduxjs/toolkit'
import loginStateSlice from './slices/userSlice/loginStateSlice'
import userSlice from './slices/userSlice/userSlice'
import imagesSlice from './slices/assetsSlice/imagesSlice'
import youtubeVideoSlice from './slices/assetsSlice/youtubeVideoSlice'
import audiosSlice from './slices/assetsSlice/audiosSlice'
import scheduleSlice from './slices/scheduleSlice/scheduleSlice'
import gallerySlice from './slices/gallerySlice/gallerySlice'
import audioConfigurationSlice from './slices/audioConfigurationSlice/audioConfigurationSlice'
import descriptionTextSlice from './slices/descriptionTextSlice/descriptionTextSlice'

export default configureStore({
  reducer: {
    loginStateSlice: loginStateSlice,
    userSlice: userSlice,
    imagesSlice: imagesSlice,
    youtubeVideoSlice: youtubeVideoSlice,
    audiosSlice: audiosSlice,
    scheduleSlice: scheduleSlice,
    gallerySlice: gallerySlice,
    audioConfigurationSlice: audioConfigurationSlice,
    descriptionTextSlice: descriptionTextSlice,
  },
})
