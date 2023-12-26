import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../types/GlobalStateType'
import { AppointmentType } from '../../../../types/ScheduleTypes'
import {
  fetchScheduleAndAddToLocalStorage,
  updateScheduleInReduxAndFirestore,
} from '../../../../connect/userScheduleRequests'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { a } from 'react-spring'

export const useHandleScheduleConnect = () => {
  const schedule = useSelector((state: GlobalStateType) => state.scheduleSlice.schedule)
  const uid = useSelector((state: GlobalStateType) => state.userSlice.user.uid)
  const [appointmentIsNew, setAppointmentIsNew] = useState(false)
  const currentAppointment = useSelector(
    (state: GlobalStateType) => state.scheduleSlice.currentAppointment,
  )
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [appointmentToModify, setAppointmentToModify] = useState(currentAppointment ?? {})
  const [loading, setLoading] = useState(false)

  const updateCurrentAppointmentInSchedule = () => {
    const newSchedule = appointmentIsNew
      ? [...schedule, appointmentToModify]
      : schedule.map((appointment: AppointmentType) => {
          if (appointment.id === appointmentToModify.id) {
            return appointmentToModify
          }
          return appointment
        })
    setLoading(true)
    updateScheduleInReduxAndFirestore(newSchedule, uid, dispatch).then(() => {
      setLoading(false)
      navigate(-1)
    })
  }

  useEffect(() => {
    if (!schedule || schedule.length === 0) {
      fetchScheduleAndAddToLocalStorage(dispatch, uid)
    }
  }, [])

  const deleteCurrentAppointment = () => {
    const newSchedule = schedule.filter((appointment) => appointment.id !== appointmentToModify.id)
    setLoading(true)
    updateScheduleInReduxAndFirestore(newSchedule, uid, dispatch).then(() => {
      setLoading(false)
      navigate(-1)
    })
  }

  return {
    loading,
    appointmentToModify,
    setAppointmentIsNew,
    setAppointmentToModify,
    schedule,
    currentAppointment,
    updateCurrentAppointmentInSchedule,
    deleteCurrentAppointment,
  }
}
