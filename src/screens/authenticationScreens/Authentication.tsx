import React, { useState } from 'react'
import 'firebase/auth'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../types/GlobalStateType'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { background, primary } from '../../assets/styles/colors'
import Google from '../../assets/Google.svg'
import { AuthenticationForm } from './AuthenticationForm'
import { setUser } from '../../store/slices/userSlice/userSlice'
import { UserSliceType } from '../../types/UserSliceType'
import { getUserFromFirestore, postNewUserToFirestore } from '../../connect/userInfoRequests'
import { useHandleAuthentication } from './useHandleAuthentication'

export enum AuthenticationFormType {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

export enum ErrorTypes {
  MissingFields = 'MissingFields',
  PasswordsDontMatch = 'PasswordsDontMatch',
  None = 'none',
}

export const Authentication = () => {
  const userLoggedIn = useSelector((state: GlobalStateType) => state.loginStateSlice.userLoggedIn)
  const navigate = useNavigate()

  const {
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
  } = useHandleAuthentication()

  React.useEffect(() => {
    if (userLoggedIn) navigate('/home')
  }, [])

  return (
    <div
      className='authentication-container'
      style={{
        backgroundColor: background,
        color: primary,
      }}
    >
      <h1 className='headline'>
        {authenticationFormType === AuthenticationFormType.SignIn ? 'Sign in' : 'Register'}
      </h1>
      <div className={'form-container'}>
        <div className='regularAuthentication-container'>
          <AuthenticationForm
            email={email}
            password={password}
            name={name}
            familyName={familyName}
            passwordRepeat={passwordRepeat}
            profession={profession}
            setName={setName}
            setFamilyName={setFamilyName}
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordRepeat={setPasswordRepeat}
            setProfession={setProfession}
            authenticationFormType={authenticationFormType}
          />
          <button
            type='submit'
            className='submitButton'
            style={{ backgroundColor: primary, color: background }}
            onClick={handleEmailAuthentication}
          >
            {authenticationFormType === AuthenticationFormType.SignIn ? 'Sign In' : 'Sign Up'}
          </button>
          <div className=''>
            <span className='switchAuthentication-text'>No account yet? </span>
            <span
              className='switchAuthentication-button clickableText-animation'
              onClick={handleAuthenticationFormSwitch}
            >
              {authenticationFormType === AuthenticationFormType.SignIn ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </div>
        <button className='google-button' onClick={handleGoogleSignIn}>
          <div>
            <img src={Google} alt='SVG logo image' width={20} height={20} />
          </div>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}
