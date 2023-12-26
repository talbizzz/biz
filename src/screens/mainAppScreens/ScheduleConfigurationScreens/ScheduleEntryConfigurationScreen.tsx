import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../types/GlobalStateType'
import { TextDisplayInput } from '../PersonalDataConfigurationScreens/textDisplayInput/TextDisplayInput'
import { FlexDirection, Overflow } from '../../../constants/StylingConstants'
import { TextButton } from '../../../components/textButton/TextButton'
import { PerformerInput } from '../MediaScreens/AudiosConfigurationScreens/components/PerformerInput'
import { PerformerType } from '../../../types/AssetsTypes'
import { SVGButton, SVGButtonTypes } from '../../../components/svgButton/SVGButton'
import { v4 as uuid } from 'uuid'
import { useHandleScheduleConnect } from './utils/useHandleScheduleConnect'
import ClipLoader from 'react-spinners/ClipLoader'
import { background, backgroundLight, black } from '../../../assets/styles/colors'
import { globalStyles } from '../../../assets/styles/globalStyles'

type ModulablePerfomerType = { uid: string } & PerformerType

export const ScheduleEntryConfigurationScreen = () => {
  const {
    appointmentToModify,
    setAppointmentToModify,
    currentAppointment,
    updateCurrentAppointmentInSchedule,
    deleteCurrentAppointment,
    loading,
  } = useHandleScheduleConnect()
  const [audioPerformers, setAudioPerformers] = React.useState<ModulablePerfomerType[]>(
    currentAppointment?.performers
      ? currentAppointment?.performers.map((performer: PerformerType) => ({
          ...performer,
          uid: uuid(),
        }))
      : [],
  )

  const handleChange = (value: string, key: string) => {
    setAppointmentToModify({ ...appointmentToModify, [key]: value })
  }

  useEffect(() => {
    setAppointmentToModify({
      ...appointmentToModify,
      performers: audioPerformers.map((performer) => {
        return { name: performer.name, role: performer.role }
      }),
    })
  }, [audioPerformers])

  return (
    <div style={styles.container}>
      <div className='personalDataConfiguration-title'>Appointment Configuration</div>
      <div className='personalDataConfiguration-subtitle'>
        Add new entries to your schedule, or Modify the existing ones by clicking on them
      </div>
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
        <div style={styles.appointmentContainer}>
          <TextDisplayInput
            label='Title'
            value={appointmentToModify?.title ?? ''}
            onChange={(value: string) => handleChange(value, 'title')}
          />
          <TextDisplayInput
            label='Date'
            value={appointmentToModify?.date ?? ''}
            onChange={(value: string) => handleChange(value, 'date')}
          />
          <TextDisplayInput
            label='Time'
            value={appointmentToModify?.time ?? ''}
            onChange={(value: string) => handleChange(value, 'time')}
          />
          <TextDisplayInput
            label='Event Link'
            value={appointmentToModify?.eventLink ?? ''}
            onChange={(value: string) => handleChange(value, 'eventLink')}
          />
          <TextDisplayInput
            label='Location'
            value={appointmentToModify?.location ?? ''}
            onChange={(value: string) => handleChange(value, 'location')}
          />
          <TextDisplayInput
            label='Address'
            value={appointmentToModify?.address ?? ''}
            onChange={(value: string) => handleChange(value, 'address')}
          />
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
        </div>
      )}
      <div style={styles.uploadButtonContainer}>
        <TextButton text='Upload Appointment' onClick={updateCurrentAppointmentInSchedule} />
        <TextButton
          text='Delete Appointment'
          onClick={deleteCurrentAppointment}
          style={{ marginLeft: 20 }}
          backgroundColor={'red'}
        />
      </div>
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
    color: background,
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    alignSelf: 'center',
  },
  appointmentContainer: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: '60%',
    width: '80%',
    overflowY: Overflow.scroll,
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
