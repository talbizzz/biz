import React from 'react'
import { background, white } from '../../../assets/styles/colors'
import { useHandleScheduleConnect } from './utils/useHandleScheduleConnect'
import { AppointmentType } from '../../../types/ScheduleTypes'
import { FlexDirection, Overflow, TextAlign } from '../../../constants/StylingConstants'
import { ScheduleEntryCard } from './components/ScheduleEntryCard'
import { TextButton } from '../../../components/textButton/TextButton'
import { useNavigate } from 'react-router-dom'
import { SVGButton, SVGButtonTypes } from '../../../components/svgButton/SVGButton'
import { globalStyles } from '../../../assets/styles/globalStyles'
import { setCurrentAppointment } from '../../../store/slices/scheduleSlice/scheduleSlice'
import { useDispatch } from 'react-redux'

export const ScheduleConfigurationScreen = () => {
  const { schedule, setAppointmentIsNew } = useHandleScheduleConnect()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddNewAppointment = () => {
    setAppointmentIsNew(true)
    dispatch(setCurrentAppointment({}))
    navigate('/schedule-configuration/view-or-configure-schedule-entry')
  }

  return (
    <div className='gallery-configuration-screen-container' style={styles.container}>
      <div className='personalDataConfiguration-title'>Schedule modification</div>
      <div className='personalDataConfiguration-subtitle'>
        Add new entries to your schedule, or Modify the existing ones by clicking on them
      </div>
      <div style={styles.scheduleEntriesContainer}>
        {schedule?.map((scheduleEntry: AppointmentType, index: number) => (
          <ScheduleEntryCard
            key={index}
            scheduleEntryId={scheduleEntry.id}
            scheduleEntry={scheduleEntry}
          />
        ))}
      </div>
      <TextButton
        text='Add new entry'
        style={styles.newAudioButtonStyle}
        onClick={handleAddNewAppointment}
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
  container: {
    color: background,
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'center',
    height: '100vh',
  },
  singleEntryContainer: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    alignItems: 'stretch',
    textAlign: TextAlign.center,
    width: '50%',
    marginBottom: 20,
    padding: 20,
    cursor: 'pointer',
  },
  scheduleEntriesContainer: {
    height: '60vh',
    overflowY: Overflow.scroll,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: FlexDirection.column,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  newAudioButtonStyle: {
    padding: '16px 36px',
    cursor: 'pointer',
    fontSize: 'large',
    marginTop: 50,
  },
}
