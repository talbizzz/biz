import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Authentication } from './screens/authenticationScreens/Authentication'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { setUserLoggedIn } from './store/slices/userSlice/loginStateSlice'
import { setUser } from './store/slices/userSlice/userSlice'
import { Welcome } from './screens/welcomeScreen/Welcome'
import { Home } from './screens/mainAppScreens/homeScreens/Home'
import { getUserFromFirestore } from './connect/userInfoRequests'
import { PersonalDataConfiguration } from './screens/mainAppScreens/PersonalDataConfigurationScreens/PersonalDataConfiguration'
import './App.css'
import { OtherAssetsScreen } from './screens/mainAppScreens/MediaScreens/OtherAssetsScreen'
import { GalleryConfigurationScreen } from './screens/mainAppScreens/MediaScreens/GalleryConfigurationScreen/GalleryConfigurationScreen'
import { SingleImageView } from './screens/mainAppScreens/MediaScreens/GalleryConfigurationScreen/utils/components/SingleImageView'
import { AddImageView } from './screens/mainAppScreens/MediaScreens/GalleryConfigurationScreen/utils/components/AddImageView'
import { VideosConfigurationScreen } from './screens/mainAppScreens/MediaScreens/VideosConfigurationScreens/VideosConfigurationScreen'
import { AudioConfigurationScreen } from './screens/mainAppScreens/MediaScreens/AudiosConfigurationScreens/AudioConfigurationScreen'
import { SingleAudioScreen } from './screens/mainAppScreens/MediaScreens/AudiosConfigurationScreens/SingleAudioScreen'
import { ScheduleConfigurationScreen } from './screens/mainAppScreens/ScheduleConfigurationScreens/ScheduleConfigurationScreens'
import { ScheduleEntryConfigurationScreen } from './screens/mainAppScreens/ScheduleConfigurationScreens/ScheduleEntryConfigurationScreen'
import { AboutScreen } from './screens/mainAppScreens/AboutScreens/AboutScreen'
import { NavBar } from './components/navbar/Navbar'
import { ProfileScreen } from './screens/authenticationScreens/ProfileScreen'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log('user ID: ', user.uid)
            const userData = await getUserFromFirestore(user.uid)
            dispatch(setUser(userData))
            dispatch(setUserLoggedIn(true))
          }
          setLoading(false) // Set loading to false after authentication state is resolved
        })
      } catch (error) {
        console.log('[App] error: ', error)
      }
    }

    checkAuthState()
  }, []) // Empty dependency array ensures this effect runs once after the initial render

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/home' element={<Home />} />
      <Route path='/authentication' element={<Authentication />} />
      <Route path='/personalData-configuration' element={<PersonalDataConfiguration />} />
      <Route path='/other-assets-configuration' element={<OtherAssetsScreen />} />
      <Route path='/gallery-configuration' element={<GalleryConfigurationScreen />} />
      <Route path='/gallery-configuration/view-or-configure-image' element={<SingleImageView />} />
      <Route path='/gallery-configuration/add-and-configure-new-image' element={<AddImageView />} />
      <Route path='/videos-configuration' element={<VideosConfigurationScreen />} />
      <Route path='/audios-configuration' element={<AudioConfigurationScreen />} />
      <Route path='/audios-configuration/view-or-configure-audio' element={<SingleAudioScreen />} />
      <Route path='/schedule-configuration' element={<ScheduleConfigurationScreen />} />
      <Route
        path='/schedule-configuration/view-or-configure-schedule-entry'
        element={<ScheduleEntryConfigurationScreen />}
      />
      <Route path='/about-yourself' element={<AboutScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
    </Routes>
  )
}

export default App
