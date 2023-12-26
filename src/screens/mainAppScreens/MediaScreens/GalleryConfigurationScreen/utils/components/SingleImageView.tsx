import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useHandleGalleryConfigurationState } from '../galleryUIState/useHandleGalleryConfigurationState'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../../../types/GlobalStateType'
import { TextDisplayInput } from '../../../../PersonalDataConfigurationScreens/textDisplayInput/TextDisplayInput'
import { background, white } from '../../../../../../assets/styles/colors'
import Close from '../../../../../../assets/Close.svg'
import ArrowRight from '../../../../../../assets/ArrowRight.svg'
import { ImageType } from '../../../../../../types/AssetsTypes'
import { useHandleUploadImages } from '../connect/useHandleUploadImages'
import { updateImagesInReduxAndFirestore } from '../../../../../../connect/userAssetsRequests'
import { TextButton } from '../../../../../../components/textButton/TextButton'

export const SingleImageView = () => {
  const currentImage = useSelector((state: GlobalStateType) => state.gallerySlice.currentImage)
  const [imageTitle, setImageTitle] = React.useState(currentImage?.title ?? '')
  const [imageDescription, setImageDescription] = React.useState(currentImage?.description ?? '')
  const [imageCopyright, setImageCopyright] = React.useState(currentImage?.copyright ?? '')
  const { images, modifyImages } = useHandleUploadImages()

  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    const newImagesList = images.map((image: ImageType) => {
      if (image.uid === currentImage?.uid) {
        return {
          ...image,
          title: imageTitle,
          description: imageDescription,
          copyright: imageCopyright,
        }
      }
      return image
    })
    modifyImages(newImagesList)
  }

  const handleDelete = (uid: string) => {
    const newImagesList = images.filter((image: ImageType) => image.uid !== uid)
    modifyImages(newImagesList)
  }

  return (
    <div id='gallery' className='gallery-container' style={{ backgroundColor: white }}>
      <div className='opened-image-container'>
        <div className='image-internal-container'>
          <div className='single-image-container'>
            <img src={currentImage?.url} alt='img' />
          </div>
          <div className='description-container'>
            <TextDisplayInput label={'title'} value={imageTitle} onChange={setImageTitle} />
            <TextDisplayInput
              label={'Description'}
              value={imageDescription}
              onChange={setImageDescription}
            />
            <TextDisplayInput
              label={'copyright'}
              value={imageCopyright}
              onChange={setImageCopyright}
            />
            {/** TODO : make generic */}
            <div className='add-new-image-confirm-button' onClick={handleSubmit}>
              <img src={ArrowRight} alt='arrow' width={64} height={64} />
            </div>
            {/** TODO : make generic */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <TextButton
                text='Delete Image'
                onClick={() => handleDelete(currentImage?.uid ?? '')}
                backgroundColor='red'
                textColor={white}
              />
            </div>
          </div>
        </div>
        {/** TODO : make generic */}
        <div onClick={handleClose} className='close-image'>
          <img src={Close} alt='close' width={64} height={64} />
        </div>
      </div>
    </div>
  )
}
