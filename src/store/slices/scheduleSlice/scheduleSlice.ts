import { createSlice } from '@reduxjs/toolkit'

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedule: [],
    currentAppointment: {},
  },
  reducers: {
    setSchedule: (state, action) => {
      state.schedule = action.payload?.data
    },
    setCurrentAppointment: (state, action) => {
      state.currentAppointment = action.payload
    },
  },
})

export const { setSchedule, setCurrentAppointment } = scheduleSlice.actions

export default scheduleSlice.reducer
