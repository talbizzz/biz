import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../../../../config/firebase'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../../types/GlobalStateType'
import {
  getUserPhotosAndAddToLocalStorage,
  updateImagesInReduxAndFirestore,
} from '../../../../../../connect/userAssetsRequests'
import { v4 as uuid } from 'uuid'
import { ImageType } from '../../../../../../types/AssetsTypes'
import { useNavigate } from 'react-router-dom'

export const useHandleUploadImages = () => {
  const storedImages = useSelector((state: GlobalStateType) => state.imagesSlice?.images)
  const uid = useSelector((state: GlobalStateType) => state.userSlice?.user?.uid)
  const dispatch = useDispatch()
  const [imageToUpload, setImageToUpload] = useState<Blob>()
  const [imageToUploadTitle, setImageToUploadTitle] = useState<string>('')
  const [imageToUploadDescription, setImageToUploadDescription] = useState<string>('')
  const [imageToUploadCopyright, setImageToUploadCopyright] = useState<string>('')
  const [images, setImages] = useState(storedImages)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const storedImagesSize = storedImages?.length

  const pathToUploadedImage = `${uid}/images/${uuid()}`

  /**
   * @description uploads new images to firebase storage
   */
  const uploadNewImageToFirebaseStorage = async () => {
    if (imageToUpload) {
      const fileImageRef = ref(storage, pathToUploadedImage)
      setLoading(true)
      await uploadBytes(fileImageRef, imageToUpload)
        .then(() => {
          console.log(`new image ${uuid()} uploaded to firebase storage`)
        })
        .finally(() => {
          getUploadedImageDownloadURL()
          setLoading(false)
        })
    }
  }

  /**
   * @description gets images download urls from firebase storage
   */
  const getUploadedImageDownloadURL = () => {
    const imgRef = ref(storage, pathToUploadedImage)
    setLoading(true)
    getDownloadURL(imgRef)
      .then((url) => {
        const newImage: ImageType = {
          uid: uuid(),
          url: url,
          title: imageToUploadTitle,
          description: imageToUploadDescription,
          copyright: imageToUploadCopyright,
        }
        setImages([...images, newImage])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  /**
   * @description everytime the component is rerendered we fetch the images from firestore and restore them in redux
   */
  useEffect(() => {
    getUserPhotosAndAddToLocalStorage(uid, dispatch)
  }, [])

  /**
   * @description everytime the images in redux are updated we update the local state
   */
  useEffect(() => {
    setImages(storedImages)
  }, [storedImages])

  /**
   * @description everytime the images are updated we check first if the list is longer than the original list (we have new images) and then we upload them to the store
   */
  useEffect(() => {
    if (images?.length > storedImagesSize) {
      modifyImages(images)
    }
  }, [images])

  /**
   * @description updates the images in redux and firestore and navigates back to the previous page
   * @param images new images list
   */
  const modifyImages = (images: ImageType[]) => {
    setLoading(true)
    updateImagesInReduxAndFirestore(images, uid, dispatch)
      .then(() => {
        getUserPhotosAndAddToLocalStorage(uid, dispatch)
      })
      .finally(() => {
        setLoading(false)
        navigate(-1)
      })
  }

  return {
    uploadNewImageToFirebaseStorage,
    getUploadedImageDownloadURL,
    setImageToUpload,
    setImageToUploadCopyright,
    imageToUploadCopyright,
    setImageToUploadDescription,
    imageToUploadDescription,
    setImageToUploadTitle,
    imageToUploadTitle,
    imageToUpload,
    modifyImages,
    images,
    loading,
  }
}
