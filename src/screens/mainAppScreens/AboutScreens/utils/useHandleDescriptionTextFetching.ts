import React, { useEffect } from 'react'
import {
  fetchDesciptionTextAndAddToLocalStorage,
  updateDescriptionTextInReduxAndFirestore,
} from '../../../../connect/userDescriptionTextRequests'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../types/GlobalStateType'
import { TextLanguage } from './constants'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../../config/firebase'
import { v4 as uuid } from 'uuid'

export const useHandleDescriptionTextFetching = () => {
  // Redux store states
  const dispatch = useDispatch()
  const uid = useSelector((state: GlobalStateType) => state.userSlice.user.uid)
  const descriptionTextFromRedux = useSelector(
    (state: GlobalStateType) => state.descriptionTextSlice?.descriptionText,
  )

  // local states
  const [currentTextLanguage, setCurrentTextLanguage] = React.useState(TextLanguage.DE)
  const [textDE, setTextDE] = React.useState<string>('')
  const [textEN, setTextEN] = React.useState<string>('')
  const [currentlyShownText, setCurrentlyShownText] = React.useState<string>(
    currentTextLanguage === TextLanguage.DE ? textDE : textEN,
  )
  const [image, setImage] = React.useState<string>('')
  const [imageToUpload, setImageToUpload] = React.useState<Blob>()
  const [uploadingNewImage, setUploadingNewImage] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  // Constants
  const pathToUploadedImage = `${uid}/descriptionText/${uuid()}`

  // Effects
  useEffect(() => {
    if (descriptionTextFromRedux) {
      setTextDE(descriptionTextFromRedux.textDE)
      setTextEN(descriptionTextFromRedux.textEN)
      setImage(descriptionTextFromRedux.image)
      setCurrentlyShownText(currentTextLanguage === TextLanguage.DE ? textDE : textEN)
    }
  }, [descriptionTextFromRedux])

  useEffect(() => {
    if (currentTextLanguage === TextLanguage.DE) {
      setCurrentlyShownText(textDE)
    } else {
      setCurrentlyShownText(textEN)
    }
  }, [currentTextLanguage])

  useEffect(() => {
    setLoading(true)
    fetchDesciptionTextAndAddToLocalStorage(dispatch, uid).then(() => {
      setLoading(false)
    })
  }, [uid])

  /**
   * @description uploads new images to firebase storage
   * this function will trigger a series of others functions
   * that will update the whole descriptionText in firebase storage
   */
  const uploadNewImageToFirebaseStorageAndUpdateDescriptionText = async () => {
    setLoading(true)
    if (imageToUpload) {
      const fileImageRef = ref(storage, pathToUploadedImage)
      await uploadBytes(fileImageRef, imageToUpload)
        .then(() => {
          console.log(`new image ${uuid()} uploaded to firebase storage`)
        })
        .finally(() => {
          getUploadedImageDownloadURL()
          setLoading(false)
        })
    } else {
      const newDescriptionText = {
        textDE: textDE as string,
        textEN: textEN as string,
        image: image as string,
      }
      updateDescriptionTextInReduxAndFirestore(newDescriptionText, uid, dispatch).then(() => {
        setLoading(false)
      })
    }
  }

  /**
   * @description gets images download urls from firebase storage
   * and then updates firebase firestore and local storage with the new descriptionText
   */
  const getUploadedImageDownloadURL = () => {
    const imgRef = ref(storage, pathToUploadedImage)

    getDownloadURL(imgRef).then((url) => {
      const newDescriptionText = {
        textDE: textDE as string,
        textEN: textEN as string,
        image: url,
      }
      updateDescriptionTextInReduxAndFirestore(newDescriptionText, uid, dispatch)
    })
  }

  const handleTextChange = (newValue: string) => {
    if (currentTextLanguage === TextLanguage.DE) {
      setTextDE(newValue)
      setCurrentlyShownText(newValue)
    } else {
      setTextEN(newValue)
      setCurrentlyShownText(newValue)
    }
  }

  return {
    imageToUpload,
    setImageToUpload,
    uploadingNewImage,
    setUploadingNewImage,
    image,
    currentTextLanguage,
    setCurrentTextLanguage,
    currentlyShownText,
    handleTextChange,
    uploadNewImageToFirebaseStorageAndUpdateDescriptionText,
    loading,
  }
}
