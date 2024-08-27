import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { AppointmentType } from '../types/ScheduleTypes'
import { setSchedule } from '../store/slices/scheduleSlice/scheduleSlice'
import { postDataToFirestore } from './common'

// -------- Getters -------- //

export const getScheduleFromFirestore = async (uid: string) => {
  const userContactInfoDocRef = doc(db, 'artist-appointments', uid) ?? undefined
  try {
    const data = await getDoc(userContactInfoDocRef)
    return data.data()
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const fetchScheduleAndAddToLocalStorage = async (dispatch: any, uid: string) => {
  // set the images in Zustand
  const schedule = await getScheduleFromFirestore(uid)
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
  dispatch: any,
) => {
  dispatch(setSchedule(schedule))
  await updateScheduleInFirestore(schedule, uid)
}

// export const updateScheduleInFirestore = async (uid: string) => {
//   const ref = doc(db, 'artist-appointments', 'rebeka-stojkoska')
//   const targetRef = doc(db, 'artist-appointments', uid)
//   try {
//     const data = await getDoc(ref)
//     console.log(data.data())
//     setDoc(targetRef, data.data())
//   } catch (error) {
//     console.error('Error getting document:', error)
//   }
// }
