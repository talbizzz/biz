import React from 'react'
import { useHandleAudiosUpload } from './utils/useHandleAudiosUpload'
import { AudioType } from '../../../../types/AssetsTypes'
import { background, white } from '../../../../assets/styles/colors'
import { FlexDirection, Overflow, TextAlign } from '../../../../constants/StylingConstants'
import './styles.css'
import { SVGButton, SVGButtonTypes } from '../../../../components/svgButton/SVGButton'
import { TextButton } from '../../../../components/textButton/TextButton'
import { globalStyles } from '../../../../assets/styles/globalStyles'

export const AudioConfigurationScreen = () => {
  const { audios, handleOnAudioOrAddClick, handleDeleteAudio } = useHandleAudiosUpload()
  return (
    <div
      className='gallery-configuration-screen-container'
      style={{ backgroundColor: white, color: background }}
    >
      <div className='personalDataConfiguration-title'>Audios upload and modification</div>
      <div className='personalDataConfiguration-subtitle'>
        Add New audios, or Modify the existing ones by clicking on them
      </div>
      <div style={styles.audiosContainer}>
        {audios?.map((audio: AudioType, index: number) => (
          <div
            key={index}
            style={styles.singleAudioContainer}
            onClick={() => handleOnAudioOrAddClick(audio)}
            className='hover-elevation-effect'
          >
            <audio controls>
              <source src={audio.url} />
            </audio>
            <span>{audio.title}</span>
            {audio.performers.map((performer: { name: string; role: string }, index: number) => (
              <div key={index}>
                <span className='audio-performers'>{performer.name + ' - ' + performer.role}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <TextButton
        text='Add New Audio'
        onClick={() => handleOnAudioOrAddClick({} as AudioType)}
        style={styles.newAudioButtonStyle}
      />
      <SVGButton
        type={SVGButtonTypes.ArrowLeft}
        onClick={() => {
          window.history.back()
        }}
        style={globalStyles.backButtonStyle}
        positionAbsolute
      />
    </div>
  )
}

const styles = {
  singleAudioContainer: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: TextAlign.center,
    width: '50%',
    marginBottom: 20,
    padding: 20,
    cursor: 'pointer',
  },
  audiosContainer: {
    width: '100%',
    height: '60vh',
    overflowY: Overflow.scroll,
    display: 'flex',
    alignItems: 'center',
    flexDirection: FlexDirection.column,
    paddingVertical: 20,
  },
  newAudioButtonStyle: {
    padding: '16px 36px',
    cursor: 'pointer',
    fontSize: 'large',
    marginTop: 50,
  },
}
