import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../types/GlobalStateType'
import { useEffect, useState } from 'react'
import {
  getUserYoutubeVideosAndAddToLocalStorage,
  getUserYoutubeVideosFromFirestore,
  updateYoutubeVideosInReduxAndFirestore,
} from '../../../../../connect/userAssetsRequests'

export const useHandleYoutubeVideosRequests = () => {
  const youtubeVideos = useSelector(
    (state: GlobalStateType) => state.youtubeVideoSlice.youtubeVideos,
  )
  const uid = useSelector((state: GlobalStateType) => state.userSlice.user.uid)
  const dispatch = useDispatch()

  const [updatedYoutubeVideosList, setUpdatedYoutubeVideosList] = useState(youtubeVideos)
  const [newYoutubeVideoURL, setNewYoutubeVideoURL] = useState('')

  /**
   * @description everytime the component is rerendered we fetch the youtubeVideos from firestore and restore them in redux
   */
  useEffect(() => {
    getUserYoutubeVideosAndAddToLocalStorage(uid, dispatch)
  }, [])

  /**
   * @description everytime the youtubeVideos in redux are updated we update the local state
   */
  useEffect(() => {
    setUpdatedYoutubeVideosList(youtubeVideos)
  }, [youtubeVideos])

  /**
   * deletes youtube videos that match given url (deletes all of them)
   * @param youtubeVideoURL url of video to delete
   */
  const deleteYoutubeVideo = (youtubeVideoURL: string) => {
    setUpdatedYoutubeVideosList(
      updatedYoutubeVideosList.filter((youtubeVideo) => youtubeVideo.url !== youtubeVideoURL),
    )
  }

  /**
   * @description adds new youtube video to the list of youtube videos to upload and sets url field to empty string
   */
  const updateYoutubeVideosList = () => {
    setUpdatedYoutubeVideosList([...updatedYoutubeVideosList, { url: newYoutubeVideoURL }])
    setNewYoutubeVideoURL('')
  }

  /**
   * @description uploads new youtube videos to firebase and updates redux
   */
  const uploadNewVideos = () => {
    updateYoutubeVideosInReduxAndFirestore(updatedYoutubeVideosList, uid, dispatch).then(() => {
      getUserYoutubeVideosAndAddToLocalStorage(uid, dispatch)
    })
  }

  return {
    updatedYoutubeVideosList,
    newYoutubeVideoURL,
    setNewYoutubeVideoURL,
    deleteYoutubeVideo,
    updateYoutubeVideosList,
    uploadNewVideos,
  }
}
