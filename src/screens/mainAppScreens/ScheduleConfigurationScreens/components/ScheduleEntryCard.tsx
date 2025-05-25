/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FlexDirection } from '../../../../constants/StylingConstants'
import { setCurrentAppointment } from '../../../../store/slices/scheduleSlice/scheduleSlice'
import { AppointmentType } from '../../../../types/ScheduleTypes'

export type ScheduleEntryCardProps = {
  scheduleEntryId: string
  scheduleEntry: AppointmentType
}

function getDateWithMonthName(date: string): string {
  const [day, month, year] = date.split('.')
  const monthIndex = parseInt(month) - 1
  const germanMonths = [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ]
  return day + ' ' + germanMonths[monthIndex] + ', ' + year
}

export const ScheduleEntryCard = (props: ScheduleEntryCardProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = () => {
    dispatch(setCurrentAppointment(props.scheduleEntry))
    navigate('/schedule-configuration/view-or-configure-schedule-entry')
  }

  return (
    <div style={styles.container} className='hover-elevation-effect' onClick={handleClick}>
      <div>
        <div style={styles.dateContainer}>{getDateWithMonthName(props.scheduleEntry.date)}</div>
        <div>{props.scheduleEntry.time}</div>
        <div>{props.scheduleEntry.title}</div>
      </div>
      <div>
        <div>{props.scheduleEntry.location}</div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: FlexDirection.row,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 100,
    marginBottom: 20,
    padding: 20,
    cursor: 'pointer',
  },
  dateContainer: {
    fontWeight: 'lighter',
    fontSize: 'xx-large',
  },
  archivedContainer: {
    color: 'red',
    fontStyle: 'italic',
    justifySelf: 'flex-end',
  },
}
