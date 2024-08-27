import React from 'react'
import './styles.css'
import { useHandleUploadImages } from './utils/connect/useHandleUploadImages'
import { useNavigate } from 'react-router-dom'
import { useHandleGalleryConfigurationState } from './utils/galleryUIState/useHandleGalleryConfigurationState'
import { ImageType } from '../../../../types/AssetsTypes'
import { background, white } from '../../../../assets/styles/colors'
import { SVGButton, SVGButtonTypes } from '../../../../components/svgButton/SVGButton'
import { globalStyles } from '../../../../assets/styles/globalStyles'

export const GalleryConfigurationScreen = () => {
  const { images } = useHandleUploadImages()

  const { handleOpenCurrentImage } = useHandleGalleryConfigurationState()
  const navigate = useNavigate()

  const handleClickOnImage = (image: ImageType) => {
    handleOpenCurrentImage(image)
  }

  const handleClickOnAddImage = () => {
    navigate('/gallery-configuration/add-and-configure-new-image')
  }

  return (
    <div
      className='gallery-configuration-screen-container'
      style={{ backgroundColor: white, color: background }}
    >
      <div className='personalDataConfiguration-title'>Photos upload and modification</div>
      <div className='personalDataConfiguration-subtitle'>
        Click on the plus container to upload a new image, and click on any image to modify it
      </div>
      <div className='images-container'>
        {images?.map((image, index) => (
          <div key={index} onClick={() => handleClickOnImage(image)}>
            <img src={image.url} className='image' alt='image' />
          </div>
        ))}
        <div className='add-image image' onClick={handleClickOnAddImage}>
          <SVGButton
            type={SVGButtonTypes.Plus}
            width={64}
            height={64}
            onClick={handleClickOnAddImage}
          />
        </div>
      </div>
      <SVGButton
        type={SVGButtonTypes.ArrowLeft}
        onClick={() => {
          navigate(-1)
        }}
        style={globalStyles.backButtonStyle}
        positionAbsolute
      />
    </div>
  )
}
