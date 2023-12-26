import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../types/GlobalStateType'

export const PersonalDataPreviewComponent = () => {
  const userData = useSelector((state: GlobalStateType) => state.userSlice.user)

  return (
    <div className='personal-data-preview-container'>
      <div className='personal-data-preview-title'>Personal Data and Information</div>
      <div className='description-text'>
        Press here to modify your personal data, such as your name, family name, email, etc...
      </div>
      <div className='personal-data-preview-content-container'>
        <div className='single-input-container'>
          <span className='single-input-value'>First Name</span>
          <span className='single-input-label'>{userData?.name ?? ''}</span>
        </div>
        <div className='single-input-container'>
          <span className='single-input-value'>Last Name</span>
          <span className='single-input-label'>{userData?.familyName ?? ''}</span>
        </div>
        <div className='single-input-container'>
          <span className='single-input-value'>Email</span>
          <span className='single-input-label'>{userData?.email ?? ''}</span>
        </div>
        <div className='single-input-container'>
          <span className='single-input-value'>Profession</span>
          <span className='single-input-label'>{userData?.profession ?? ''}</span>
        </div>
        {userData.additionalData &&
          userData?.additionalData?.map((data, index) => (
            <div key={index} className='single-input-container'>
              <span className='single-input-value'>{data.label}</span>
              <span className='single-input-label'>{data.value}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
