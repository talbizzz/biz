import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { postDataToFirestore } from './common'
import { setContactInfo } from '../store/slices/contactInfoSlice/contactInfoSlice'
import { UserContactInfoType } from '../types/UserContactDataType'

// -------- Getters -------- //

export const getContactInfoFromFirestore = async (uid: string) => {
  const docRef = doc(db, 'artist-contactInfo', uid)
  try {
    const data = await getDoc(docRef)
    console.log(data.data())
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const fetchContactInfoAndAddToLocalStorage = async (
  dispatch: Dispatch<AnyAction>,
  uid: string,
) => {
  // set the images in Zustand
  const ContactInfo = await getContactInfoFromFirestore(uid)
  dispatch(setContactInfo(ContactInfo))
}

// -------- Setters -------- //

export const updateContactInfoInFirestore = (contactInfo: UserContactInfoType, uid: string) => {
  const docRef = doc(db, 'artist-contactInfo', uid)
  postDataToFirestore(docRef, contactInfo)
}

export const updateContactInfoInReduxAndFirestore = (
  contactInfo: UserContactInfoType,
  uid: string,
  dispatch: Dispatch<AnyAction>,
) => {
  dispatch(setContactInfo(contactInfo))
  updateContactInfoInFirestore(contactInfo, uid)
}
