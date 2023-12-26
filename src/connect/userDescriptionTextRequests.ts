import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { postDataToFirestore } from './common'
import { setDescriptionText } from '../store/slices/descriptionTextSlice/descriptionTextSlice'
import { UserDescriptionTextType } from '../types/UserDescriptionTextType'

// -------- Getters -------- //

export const getDescriptionTextFromFirestore = async (uid: string) => {
  const userContactInfoDocRef = doc(db, 'artist-biography', uid)
  try {
    const data = await getDoc(userContactInfoDocRef)
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const fetchDesciptionTextAndAddToLocalStorage = async (
  dispatch: Dispatch<AnyAction>,
  uid: string,
) => {
  // set the images in Zustand
  const descriptionText = await getDescriptionTextFromFirestore(uid)
  dispatch(setDescriptionText(descriptionText))
}

// -------- Setters -------- //

export const updateDescriptionTextInFirestore = (
  descriptionText: UserDescriptionTextType,
  uid: string,
) => {
  const docRef = doc(db, 'artist-biography', uid)
  postDataToFirestore(docRef, descriptionText)
}

export const updateDescriptionTextInReduxAndFirestore = async (
  desciptionText: UserDescriptionTextType,
  uid: string,
  dispatch: Dispatch<AnyAction>,
) => {
  dispatch(setDescriptionText(desciptionText))
  await updateDescriptionTextInFirestore(desciptionText, uid)
}
