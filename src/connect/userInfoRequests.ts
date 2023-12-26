import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { db } from '../config/firebase'
import { UserSliceType } from '../types/UserSliceType'

export const getUserFromFirestore = async (uid: string) => {
  console.log('uid: ', uid)
  const userContactInfoDocRef = doc(db, 'artist-personalData', uid)
  try {
    const data = await getDoc(userContactInfoDocRef)
    const result = data.data()
    return result
  } catch (error) {
    console.error('Error getting document:', error)
  }
}

export const postNewUserToFirestore = async (uid: string, user: UserSliceType) => {
  const userContactInfoDocRef = doc(db, 'artist-personalData', uid)
  try {
    await setDoc(userContactInfoDocRef, user.user)
  } catch (error) {
    console.error('error: ', error)
  }
}
