import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../types/GlobalStateType'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  getUserAudiosAndAddToLocalStorage,
  updateAudiosInReduxAndFirestore,
} from '../../../../../connect/userAssetsRequests'
import { AudioType, PerformerType } from '../../../../../types/AssetsTypes'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCurrentAudio } from '../../../../../store/slices/audioConfigurationSlice/audioConfigurationSlice'

export const useHandleAudiosUpload = () => {
  //REDUX
  const storedAudios = useSelector((state: GlobalStateType) => state.audiosSlice.audios)
  const uid = useSelector((state: GlobalStateType) => state.userSlice.user.uid)
  const currentAudio = useSelector(
    (state: GlobalStateType) => state.audioConfigurationSlice?.currentAudio,
  )
  const dispatch = useDispatch()

  //ROUTER
  const navigate = useNavigate()
  const location = useLocation()

  //CONSTANTS
  const pathToUploadedAudio = `${uid}/audios/${uuid()}`

  //STATE VARIABLES
  const [audios, setAudios] = useState(storedAudios)
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * @description everytime the component is rerendered we fetch the images from firestore and restore them in redux
   */
  useEffect(() => {
    getUserAudiosAndAddToLocalStorage(uid, dispatch)
  }, [])

  /**
   * @description everytime the audios in redux are updated we update the local state
   */
  useEffect(() => {
    setAudios(storedAudios)
  }, [storedAudios])

  /**
   * @description everytime the images are updated we check first if the list is longer than the original list (we have new images) and then we upload them to the store
   */
  useEffect(() => {
    if (audios && audios?.length > storedAudios?.length) {
      modifyAudios(audios)
    }
  }, [audios])

  /**
   * @description updates the images in redux and firestore and navigates back to the previous page
   * @param audios new audios list
   */
  const modifyAudios = (newAudios: AudioType[]) => {
    console.log('new audios', newAudios)
    setLoading(true)
    updateAudiosInReduxAndFirestore(newAudios, uid, dispatch)
      .then(() => {
        getUserAudiosAndAddToLocalStorage(uid, dispatch)
      })
      .finally(() => {
        setLoading(false)
      })
    navigate(-1)
  }

  /**
   * uploads a new audio to firebase storage whose link we're going to fetch and store in firestore
   * @param audio audio to upload to firebase storage
   */
  const uploadNewAudioToFirebaseStorage = async (
    audio: Blob,
    audioTitle: string,
    audioPerformers: PerformerType[],
  ) => {
    setLoading(true)
    const audioFileRef = ref(storage, pathToUploadedAudio)
    await uploadBytes(audioFileRef, audio)
      .then(() => {
        console.log(`new audio uploaded to firebase storage in ${pathToUploadedAudio}`)
      })
      .finally(() => {
        setLoading(false)
        getUploadedAudioDownloadURL(audioTitle, audioPerformers)
      })
  }

  /**
   * @description gets images download urls from firebase storage
   */
  const getUploadedAudioDownloadURL = (audioTitle: string, audioPerformers: PerformerType[]) => {
    const audioRef = ref(storage, pathToUploadedAudio)
    setLoading(true)

    getDownloadURL(audioRef)
      .then((url) => {
        const newAudio: AudioType = {
          uid: uuid(),
          url: url,
          title: audioTitle,
          performers: audioPerformers,
        }
        modifyAudios([...audios, newAudio])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  /**
   * @description navigates to single-image-screen
   */
  const handleOnAudioOrAddClick = (audio?: AudioType) => {
    navigate('/audios-configuration/view-or-configure-audio')
    if (audio) {
      dispatch(setCurrentAudio(audio))
    }
  }

  /**
   * @description deletes an audio with given uid from the list
   * @param uid audio uid
   */
  const handleDeleteAudio = (uid: string) => {
    const newAudios = audios.filter((audio) => audio.uid !== uid)
    modifyAudios(newAudios)
  }

  return {
    audios,
    loading,
    currentAudio,
    handleOnAudioOrAddClick,
    setAudios,
    modifyAudios,
    uploadNewAudioToFirebaseStorage,
    handleDeleteAudio,
  }
}
