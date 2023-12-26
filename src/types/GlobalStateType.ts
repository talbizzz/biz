import { LoginStateSliceType } from './LoginStateSliceType'
import { UserSliceType } from './UserSliceType'
import { AudioType, ImageType, YoutubeVideoType } from './AssetsTypes'
import { AppointmentType } from './ScheduleTypes'

export type GlobalStateType = {
  loginStateSlice: LoginStateSliceType
  userSlice: UserSliceType
  imagesSlice: { images: ImageType[] }
  youtubeVideoSlice: { youtubeVideos: YoutubeVideoType[] }
  audiosSlice: { audios: AudioType[] }
  scheduleSlice: { schedule: AppointmentType[]; currentAppointment: AppointmentType }
  gallerySlice: { currentImage: ImageType }
  audioConfigurationSlice: { currentAudio: AudioType }
  descriptionTextSlice: { descriptionText: { textDE: string; textEN: string; image: string } }
}
