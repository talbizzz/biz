import React from 'react'
import { TextInput } from './textInput/TextInput'
import { AuthenticationFormType } from './Authentication'

type AuthenticationFormProps = {
  email: string
  password: string
  name: string
  familyName: string
  passwordRepeat: string
  profession: string
  setEmail: (newValue: string) => void
  setPassword: (newValue: string) => void
  setName: (newValue: string) => void
  setFamilyName: (newValue: string) => void
  setPasswordRepeat: (newValue: string) => void
  setProfession: (newValue: string) => void
  authenticationFormType: AuthenticationFormType
}

export const AuthenticationForm = (props: AuthenticationFormProps) => {
  const {
    email,
    password,
    authenticationFormType,
    name,
    familyName,
    passwordRepeat,
    profession,
    setEmail,
    setPassword,
    setName,
    setFamilyName,
    setPasswordRepeat,
    setProfession,
  } = props

  return (
    <div className='textInputs'>
      {authenticationFormType === AuthenticationFormType.SignUp && (
        <>
          <TextInput label='Name' value={name} onChange={(newValue: string) => setName(newValue)} />
          <TextInput
            label='familyName'
            title='Family Name'
            value={familyName}
            onChange={(newValue: string) => setFamilyName(newValue)}
          />
          <TextInput
            label='Profession'
            value={profession}
            onChange={(newValue: string) => setProfession(newValue)}
          />
        </>
      )}
      <TextInput
        label='Email'
        title='E-Mail'
        value={email}
        onChange={(newValue: string) => setEmail(newValue)}
      />
      <TextInput
        label='Password'
        value={password}
        onChange={(newValue: string) => setPassword(newValue)}
      />
      {authenticationFormType === AuthenticationFormType.SignUp && (
        <TextInput
          label='Password'
          title='Repeat Password'
          value={passwordRepeat}
          onChange={(newValue: string) => setPasswordRepeat(newValue)}
        />
      )}
      <div
        className='password-forgotten clickableText-animation'
        onClick={() => console.log('Sign Up clicked')}
      >
        Forgot password ?
      </div>
    </div>
  )
}
