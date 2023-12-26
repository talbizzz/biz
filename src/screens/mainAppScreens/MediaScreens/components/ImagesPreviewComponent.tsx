import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../types/GlobalStateType'
import './styles.css'
import { background, white } from '../../../../assets/styles/colors'

export const ImagesPreviewComponent = () => {
  const images = useSelector((state: GlobalStateType) => state?.imagesSlice?.images)

  return (
    <div className='personal-data-preview-container'>
      <div className='personal-data-preview-title'>Images</div>
      <div className='description-text'>
        Press here to view all your images, and add new ones to your website.
      </div>
      <div className='preview-images-container'>
        {images?.slice(0, 2).map((image, index) => (
          <div
            key={index}
            className='preview-image-container'
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ))}
        <div className='images-count' style={{ backgroundColor: background, color: white }}>
          {images?.length >= 3 ? '+' + (images?.length - 2) + 'more' : ''}
        </div>
      </div>
    </div>
  )
}
