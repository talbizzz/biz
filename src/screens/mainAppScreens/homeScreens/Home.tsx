import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GlobalStateType } from '../../../types/GlobalStateType'
import { background, white } from '../../../assets/styles/colors'
import './styles.css'
import { PersonalDataPreviewComponent } from '../PersonalDataConfigurationScreens/PersonalDataPreviewComponent'
import { ImagesPreviewComponent } from '../MediaScreens/components/ImagesPreviewComponent'
import { fetchAssetsAndAddToLocalStorage } from '../../../connect/userAssetsRequests'
import { CustomPreviewComponent } from './components/CustomPreviewComponent'
import UserIcon from '../../../assets/UserIcon.svg'
import Audio from '../../../assets/Audio.svg'
import Video from '../../../assets/Video.svg'
import Calendar from '../../../assets/Calendar.svg'
import Text from '../../../assets/Text.svg'
import { fetchScheduleAndAddToLocalStorage } from '../../../connect/userScheduleRequests'
import { PressableCard } from '../../../components/pressableCard/PressableCard'

export const Home = () => {
  const navigate = useNavigate()
  const userLoggedIn = useSelector((state: GlobalStateType) => state.loginStateSlice.userLoggedIn)
  const userData = useSelector((state: GlobalStateType) => state.userSlice.user)

  React.useEffect(() => {
    if (!userLoggedIn) navigate('/authentication')
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userData) return
    const fetchData = async () => {
      if (userData.uid) {
        fetchAssetsAndAddToLocalStorage(dispatch, userData.uid)
        fetchScheduleAndAddToLocalStorage(dispatch, userData.uid)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='home-external-wrapper'>
      <div className='filler' />
      <div className='home-container'>
        <div className='title-container'>
          <div className='title-text' style={{ color: background }}>
            <b>Welcome, {userData.name}</b>
            <br />
            Get started quickly with our easy-to-use website management tool.
          </div>
          <img
            className='profile-icon'
            src={UserIcon}
            alt='user-icon'
            width={64}
            height={64}
            onClick={() => navigate('/profile')}
          />
        </div>
        <div className={'grid-container'} style={{ backgroundColor: white }}>
          <PressableCard
            className={'card1'}
            onClick={() => navigate('/personalData-configuration')}
          >
            <PersonalDataPreviewComponent />
          </PressableCard>
          <PressableCard className={'card2'} onClick={() => navigate('/gallery-configuration')}>
            <ImagesPreviewComponent />
          </PressableCard>
          <PressableCard className={'card3'} onClick={() => navigate('/about-yourself')}>
            <CustomPreviewComponent
              icon={Text}
              title={'About yourself'}
              subtitle='Tap here to let your community and people know more about you'
            />
          </PressableCard>
          <PressableCard className={'card4'} onClick={() => navigate('/schedule-configuration')}>
            <CustomPreviewComponent
              icon={Calendar}
              title={'Your Schedule'}
              subtitle='Press here to control your availability and upcoming schedule'
            />
          </PressableCard>
          <PressableCard className={'card5'} onClick={() => navigate('/videos-configuration')}>
            <CustomPreviewComponent
              icon={Video}
              title={'Your Videos'}
              subtitle='Here you can find all your uploaded videos.'
            />
          </PressableCard>
          <PressableCard className={'card6'} onClick={() => navigate('/audios-configuration')}>
            <CustomPreviewComponent
              icon={Audio}
              title={'Your Audios'}
              subtitle={
                'Here you can, view, modfiy and also delete all the audio files uplaoded to your website.'
              }
            />
          </PressableCard>
        </div>
      </div>
    </div>
  )
}
