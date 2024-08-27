import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../types/GlobalStateType'
import { AppointmentType } from '../../../../types/ScheduleTypes'
import {
  fetchScheduleAndAddToLocalStorage,
  updateScheduleInReduxAndFirestore,
} from '../../../../connect/userScheduleRequests'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

export const useHandleScheduleConnect = () => {
  const schedule = useSelector((state: GlobalStateType) => state.scheduleSlice.schedule)
  const uid = useSelector((state: GlobalStateType) => state.userSlice.user.uid)
  const currentAppointment = useSelector(
    (state: GlobalStateType) => state.scheduleSlice.currentAppointment,
  )
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [appointmentToModify, setAppointmentToModify] = useState(currentAppointment ?? {})
  const [loading, setLoading] = useState(false)

  const updateCurrentAppointmentInSchedule = () => {
    console.log('appointmentToModify: ', appointmentToModify)
    console.log('schedule: ', schedule)
    console.log('currentAppointment.id?: ', currentAppointment.id === undefined)
    const newSchedule =
      currentAppointment.id === undefined
        ? [...schedule, { ...appointmentToModify, id: uuid() }]
        : schedule.map((appointment: AppointmentType) => {
            if (appointment.id === appointmentToModify.id) {
              return appointmentToModify
            }
            return appointment
          })
    setLoading(true)
    console.log('newSchedule: ', newSchedule)
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
    setAppointmentToModify,
    schedule,
    currentAppointment,
    updateCurrentAppointmentInSchedule,
    deleteCurrentAppointment,
  }
}
