import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { getUserFromFirestore, postNewUserToFirestore } from '../../connect/userInfoRequests'
import { auth } from '../../config/firebase'
import { UserSliceType } from '../../types/UserSliceType'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setUser } from '../../store/slices/userSlice/userSlice'
import { AuthenticationFormType } from './Authentication'
import { setUserLoggedIn } from '../../store/slices/userSlice/loginStateSlice'

export const useHandleAuthentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [profession, setProfession] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const [authenticationFormType, setAuthenticationFormType] = useState<AuthenticationFormType>(
    AuthenticationFormType.SignIn,
  )

  const handleEmailSignUp = async () => {
    if (email === '' || password === '' || name === '' || familyName === '' || profession === '') {
      console.error('Please fill out all fields')
      return alert('Please fill out all fields')
    }
    if (password !== passwordRepeat) {
      console.error('Passwords do not match')
      return alert('Passwords do not match')
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) {
        const newUser: UserSliceType = {
          user: {
            email: email,
            familyName: familyName,
            fullName: (name + ' ' + familyName).toLowerCase(),
            name: name,
            profession: profession,
            uid: user.user.uid,
            additionalData: [],
          },
        }
        await postNewUserToFirestore(user.user.uid, newUser)
        dispatch(setUser(newUser))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleEmailSignIn = async () => {
    if (email === '' || password === '') {
      console.error('Please fill out all fields')
      return alert('Please fill out all fields')
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) {
        console.log('user: ', user.user.uid)
        const userData = await getUserFromFirestore(user.user.uid)
        dispatch(setUser(userData))
      }
    } catch (error) {
      alert('Wrong email or password')
      console.error(error)
    }
  }

  const handleEmailAuthentication = () => {
    if (authenticationFormType === AuthenticationFormType.SignIn) {
      handleEmailSignIn().then(() => {
        navigation('/home')
      })
    } else {
      handleEmailSignUp().then(() => {
        navigation('/home')
      })
    }
  }

  const handleAuthenticationFormSwitch = () => {
    setAuthenticationFormType(
      authenticationFormType === AuthenticationFormType.SignIn
        ? AuthenticationFormType.SignUp
        : AuthenticationFormType.SignIn,
    )
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider).then((user) => {
        if (user.user) {
          const newUser: UserSliceType = {
            user: {
              email: user.user.email as string,
              familyName: '',
              fullName: '',
              name: '',
              profession: '',
              uid: user.user.uid,
              additionalData: [],
            },
          }
          dispatch(setUser(newUser))
          dispatch(setUserLoggedIn(true))
          navigation('/home')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleUserSignOut = async () => {
    try {
      await auth.signOut().then(() => {
        dispatch(setUser(null))
        dispatch(setUserLoggedIn(false))
      })
    } catch (error) {
      console.error(error)
    }
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    familyName,
    setFamilyName,
    profession,
    setProfession,
    passwordRepeat,
    setPasswordRepeat,
    authenticationFormType,
    handleEmailAuthentication,
    handleAuthenticationFormSwitch,
    handleGoogleSignIn,
    handleUserSignOut,
  }
}
