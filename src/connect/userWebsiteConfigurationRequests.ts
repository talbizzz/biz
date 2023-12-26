import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { AppointmentType } from '../types/ScheduleTypes'
import { setSchedule } from '../store/slices/scheduleSlice/scheduleSlice'
import { postDataToFirestore } from './common'

// -------- Getters -------- //

export const getConfigurationFromFirestore = async (uid: string) => {
  const userContactInfoDocRef = doc(db, 'artist-appointments', uid)
  try {
    const data = await getDoc(userContactInfoDocRef)
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const fetchConfiguraionAndAddToLocalStorage = async (
  dispatch: Dispatch<AnyAction>,
  uid: string,
) => {
  // set the images in Zustand
  const schedule = await getConfigurationFromFirestore(uid)
  dispatch(setSchedule(schedule))
}

// -------- Setters -------- //

export const updateScheduleInFirestore = async (schedule: AppointmentType[], uid: string) => {
  const docRef = doc(db, 'artist-appointments', uid)
  await postDataToFirestore(docRef, schedule)
}

export const updateScheduleInReduxAndFirestore = async (
  schedule: AppointmentType[],
  uid: string,
  dispatch: Dispatch<AnyAction>,
) => {
  dispatch(setSchedule(schedule))
  await updateScheduleInFirestore(schedule, uid)
}
