import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../../types/GlobalStateType'
import { TextDisplayInput } from '../../../../PersonalDataConfigurationScreens/textDisplayInput/TextDisplayInput'
import { white } from '../../../../../../assets/styles/colors'
import Close from '../../../../../../assets/Close.svg'
import { useHandleUploadImages } from '../connect/useHandleUploadImages'
import ArrowRight from '../../../../../../assets/ArrowRight.svg'

export const AddImageView = () => {
  const {
    imageToUpload,
    setImageToUpload,
    imageToUploadCopyright,
    setImageToUploadCopyright,
    imageToUploadDescription,
    setImageToUploadDescription,
    imageToUploadTitle,
    setImageToUploadTitle,
    uploadNewImageToFirebaseStorage,
  } = useHandleUploadImages()

  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  const handleChange = (e: any) => {
    setImageToUpload(e.target.files[0])
  }

  const handleSubmit = () => {
    uploadNewImageToFirebaseStorage()
  }

  return (
    <div id='gallery' className='gallery-container' style={{ backgroundColor: white }}>
      <div className='opened-image-container'>
        <div className='image-internal-container'>
          <div className='single-image-container'>
            {imageToUpload && <img src={URL.createObjectURL(imageToUpload)} alt='img' />}
            <input type='file' onChange={handleChange} />
          </div>
          <div className='description-container'>
            <TextDisplayInput
              label={'title'}
              value={imageToUploadTitle ?? ''}
              onChange={setImageToUploadTitle}
            />
            <TextDisplayInput
              label={'Description'}
              value={imageToUploadDescription ?? ''}
              onChange={setImageToUploadDescription}
            />
            <TextDisplayInput
              label={'copyrigths'}
              value={imageToUploadCopyright ?? ''}
              onChange={setImageToUploadCopyright}
            />
            <div className='add-new-image-confirm-button' onClick={handleSubmit}>
              <img src={ArrowRight} alt='arrow' width={64} height={64} />
            </div>
          </div>
        </div>
        <div onClick={handleClose} className='close-image'>
          <img src={Close} alt='close' width={64} height={64} />
        </div>
      </div>
    </div>
  )
}
