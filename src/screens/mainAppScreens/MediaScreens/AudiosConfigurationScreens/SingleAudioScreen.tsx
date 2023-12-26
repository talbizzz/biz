import React, { useEffect, useState } from 'react'
import { useHandleAudiosUpload } from './utils/useHandleAudiosUpload'
import { FlexDirection } from '../../../../constants/StylingConstants'
import { TextDisplayInput } from '../../PersonalDataConfigurationScreens/textDisplayInput/TextDisplayInput'
import { v4 as uuid } from 'uuid'
import { SVGButton, SVGButtonTypes } from '../../../../components/svgButton/SVGButton'
import { PerformerType } from '../../../../types/AssetsTypes'
import { TextButton } from '../../../../components/textButton/TextButton'
import { PerformerInput } from './components/PerformerInput'
import ClipLoader from 'react-spinners/ClipLoader'
import { background, backgroundLight, black, white } from '../../../../assets/styles/colors'
import { globalStyles } from '../../../../assets/styles/globalStyles'

type ModulablePerfomerType = { uid: string } & PerformerType

export const SingleAudioScreen = () => {
  const {
    audios,
    currentAudio,
    loading,
    uploadNewAudioToFirebaseStorage,
    modifyAudios,
    handleDeleteAudio,
  } = useHandleAudiosUpload()
  const audioUid = currentAudio?.uid ?? uuid()
  const [audioUrl, setAudioUrl] = React.useState(currentAudio?.url ?? '')
  const [audioAsBlob, setAudioAsBlob] = React.useState<Blob | null>(null)
  const [audioTitle, setAudioTitle] = React.useState(currentAudio?.title ?? '')
  const [audioPerformers, setAudioPerformers] = React.useState<ModulablePerfomerType[]>(
    currentAudio?.performers
      ? currentAudio?.performers.map((performer: PerformerType) => ({
          ...performer,
          uid: uuid(),
        }))
      : [],
  )

  const handleNewAudioUpload = (e: any) => {
    setAudioAsBlob(e.target.files[0])
    setAudioUrl(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = () => {
    if (audioAsBlob) {
      uploadNewAudioToFirebaseStorage(audioAsBlob, audioTitle, audioPerformers)
    } else {
      const newAudio = {
        uid: audioUid,
        url: audioUrl,
        title: audioTitle,
        performers: audioPerformers,
      }
      const newAudios = audios.map((audio) => (audio.uid === audioUid ? newAudio : audio))
      modifyAudios(newAudios)
    }
  }

  return (
    <div style={styles.container}>
      {loading ? (
        <ClipLoader
          color={backgroundLight}
          loading={true}
          cssOverride={styles.loadingSpinner}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <>
          <audio key={audioUrl} controls>
            <source src={audioUrl} />
          </audio>
          <input style={styles.importButton} type='file' onChange={handleNewAudioUpload} />
          <div style={styles.audioInforamtionsContainer}>
            <TextDisplayInput label={'title'} value={audioTitle} onChange={setAudioTitle} />
            {audioPerformers.length === 0 ? (
              <div style={styles.addPerformerButtonContainer}>
                <TextButton
                  text={'Add performer'}
                  onClick={() => {
                    setAudioPerformers([...audioPerformers, { name: '', role: '', uid: uuid() }])
                  }}
                />
              </div>
            ) : (
              audioPerformers.map((performer: ModulablePerfomerType, index: number) => (
                <div key={index} style={styles.performersContainer}>
                  <PerformerInput
                    performerId={performer.uid}
                    performerName={performer.name}
                    performerRole={performer.role}
                    performers={audioPerformers}
                    setPerformers={setAudioPerformers}
                  />
                </div>
              ))
            )}
            {audioPerformers.length > 0 && (
              <div style={styles.addPerformerButtonContainer}>
                <SVGButton
                  type={SVGButtonTypes.Plus}
                  onClick={() => {
                    setAudioPerformers([...audioPerformers, { name: '', role: '', uid: uuid() }])
                  }}
                />
              </div>
            )}
            <div style={styles.uploadButtonContainer}>
              <TextButton text='Upload New Audios' onClick={handleSubmit} />
              <TextButton
                text='Delete Audio'
                onClick={() => handleDeleteAudio(audioUid)}
                style={{ marginLeft: 20 }}
                backgroundColor={'red'}
              />
            </div>
          </div>
        </>
      )}
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
  container: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: '100vh',
    width: '100vw',
    padding: 20,
  },
  performersContainer: {
    display: 'flex',
    flexDirection: FlexDirection.row,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioInforamtionsContainer: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100vw',
    padding: 20,
  },
  importButton: {
    marginTop: 20,
  },
  addPerformerButtonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  loadingSpinner: {
    display: 'block',
    margin: '0 auto',
    borderColor: background,
  },
}
