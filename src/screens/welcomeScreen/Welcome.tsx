import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../types/GlobalStateType'
import { useNavigate } from 'react-router-dom'

export const Welcome = () => {
  const userLoggedIn = useSelector((state: GlobalStateType) => state.loginStateSlice.userLoggedIn)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (userLoggedIn) navigate('/home')
    else navigate('/authentication')
  }, [userLoggedIn])

  return <div>Welcome</div>
}
