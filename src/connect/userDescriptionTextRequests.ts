import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { postDataToFirestore } from './common'
import { setDescriptionText } from '../store/slices/descriptionTextSlice/descriptionTextSlice'
import { UserDescriptionTextType } from '../types/UserDescriptionTextType'
import { Action } from '@reduxjs/toolkit'
import { Dispatch } from 'react'

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
  dispatch: Dispatch<Action>,
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
  dispatch: Dispatch<Action>,
) => {
  dispatch(setDescriptionText(desciptionText))
  await updateDescriptionTextInFirestore(desciptionText, uid)
}
