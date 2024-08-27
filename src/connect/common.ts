import { DocumentReference, setDoc } from 'firebase/firestore/lite'

export const postDataToFirestore = async (ref: DocumentReference, data: object) => {
  try {
    console.log('data: ', data)
    await setDoc(ref, { data })
    console.log('Document successfully written!')
  } catch (error) {
    console.error('error: ', error)
  }
}
