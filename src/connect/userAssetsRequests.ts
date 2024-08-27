import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { setImages } from '../store/slices/assetsSlice/imagesSlice'
import { setAudios } from '../store/slices/assetsSlice/audiosSlice'
import { setYoutubeVideos } from '../store/slices/assetsSlice/youtubeVideoSlice'
import { AudioType, ImageType, YoutubeVideoType } from '../types/AssetsTypes'
import { postDataToFirestore } from './common'

// ------- User Assets Getters ------- //

const getUserPhotosFromFirestore = async (uid: string) => {
  const userContactInfoDocRef = doc(db, 'artist-assets', uid + '-images')
  try {
    const data = await getDoc(userContactInfoDocRef)
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const getUserAudiosFromFirestore = async (uid: string) => {
  const docRef = doc(db, 'artist-assets', uid + '-audios')
  try {
    const data = await getDoc(docRef)
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const getUserYoutubeVideosFromFirestore = async (uid: string) => {
  const docRef = doc(db, 'artist-assets', uid + '-youtubeVideos')
  try {
    const data = await getDoc(docRef)
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const getUserPhotosAndAddToLocalStorage = async (uid: string, dispatch: any) => {
  // Fetch updated data after waiting for Firestore update to complete
  await getUserPhotosFromFirestore(uid).then((data) => {
    dispatch(setImages(data))
  })
}

export const getUserYoutubeVideosAndAddToLocalStorage = async (uid: string, dispatch: any) => {
  // Fetch updated data after waiting for Firestore update to complete
  await getUserYoutubeVideosFromFirestore(uid).then((data) => {
    dispatch(setYoutubeVideos(data))
  })
}

export const getUserAudiosAndAddToLocalStorage = async (uid: string, dispatch: any) => {
  // Fetch updated data after waiting for Firestore update to complete
  await getUserAudiosFromFirestore(uid).then((data) => {
    dispatch(setAudios(data))
  })
}

export const fetchAssetsAndAddToLocalStorage = async (dispatch: any, uid: string) => {
  // set the images in Zustand
  const images = await getUserPhotosFromFirestore(uid)
  dispatch(setImages(images))

  // set the audios in Zustand
  const audios = await getUserAudiosFromFirestore(uid)
  dispatch(setAudios(audios))

  // set the youtube videos in Zustand
  const youtubeVideos = await getUserYoutubeVideosFromFirestore(uid)
  dispatch(setYoutubeVideos(youtubeVideos))
}

// ------- User Assets Setters ------- //

const updateImagesInFirestore = async (images: ImageType[], uid: string) => {
  const docRef = doc(db, 'artist-assets', uid + '-images')
  await postDataToFirestore(docRef, images)
}
export const updateImagesInReduxAndFirestore = async (
  images: ImageType[],
  uid: string,
  dispatch: any,
) => {
  // Update Redux state
  dispatch(setImages(images))

  // Update Firestore
  await updateImagesInFirestore(images, uid)
}

const updateAudiosInFirestore = (audios: AudioType[], uid: string) => {
  const docRef = doc(db, 'artist-assets', uid + '-audios')
  postDataToFirestore(docRef, audios)
}

export const updateAudiosInReduxAndFirestore = async (
  audios: AudioType[],
  uid: string,
  dispatch: any,
) => {
  dispatch(setAudios(audios))
  await updateAudiosInFirestore(audios, uid)
}

const updateYoutubeVideosInFirestore = (youtubeVideos: YoutubeVideoType[], uid: string) => {
  const docRef = doc(db, 'artist-assets', uid + '-youtubeVideos')
  postDataToFirestore(docRef, youtubeVideos)
}

export const updateYoutubeVideosInReduxAndFirestore = async (
  youtubeVideos: YoutubeVideoType[],
  uid: string,
  dispatch: any,
) => {
  dispatch(setYoutubeVideos(youtubeVideos))
  await updateYoutubeVideosInFirestore(youtubeVideos, uid)
}
