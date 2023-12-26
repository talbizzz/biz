import React from 'react'
import Video from '../../../../assets/Video.svg'
import './styles.css'

export const VideosPreviewComponent = () => {
  return (
    <div className='other-assets-preview-component'>
      <div className='other-assets-preview-title'>Your Videos</div>
      <div className='other-assets-description-text'>
        Here you can find all your uploaded videos.
      </div>
      <div className='other-assets-content-container'>
        <img src={Video} alt='calendar' width={64} height={64} />
      </div>
    </div>
  )
}
