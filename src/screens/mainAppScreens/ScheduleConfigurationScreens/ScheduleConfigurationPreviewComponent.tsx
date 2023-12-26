import React from 'react'
import './styles.css'
import Calendar from '../../../assets/Calendar.svg'

export const ScheduleConfigurationPreviewComponent = () => {
  return (
    <div className='schedule-preview-container'>
      <div className='schedule-preview-title'>Schedule</div>
      <div className='schedule-preview-description-text'>Press here to modify your schedule.</div>
      <div className='schedule-preview-content-container'>
        <img src={Calendar} alt='calendar' width={64} height={64} />
      </div>
    </div>
  )
}
