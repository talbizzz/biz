import React, { useEffect } from 'react'
import { TextEditor } from './components/TextEditor'
import { FlexDirection } from '../../../constants/StylingConstants'
import { background, backgroundLight } from '../../../assets/styles/colors'
import { useHandleDescriptionTextFetching } from './utils/useHandleDescriptionTextFetching'
import { TextButton } from '../../../components/textButton/TextButton'
import { TextLanguage } from './utils/constants'
import { ClipLoader } from 'react-spinners'
import { SVGButton, SVGButtonTypes } from '../../../components/svgButton/SVGButton'
import { globalStyles } from '../../../assets/styles/globalStyles'
import { useNavigate } from 'react-router-dom'

export const AboutScreen = () => {
  const {
    currentTextLanguage,
    setCurrentTextLanguage,
    currentlyShownText,
    handleTextChange,
    imageToUpload,
    setImageToUpload,
    uploadingNewImage,
    image,
    loading,
    setUploadingNewImage,
    uploadNewImageToFirebaseStorageAndUpdateDescriptionText,
  } = useHandleDescriptionTextFetching()

  const handleChange = (e: any) => {
    setUploadingNewImage(true)
    setImageToUpload(e.target.files[0])
  }

  const onSaveModifications = () => {
    uploadNewImageToFirebaseStorageAndUpdateDescriptionText()
  }

  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div className='personalDataConfiguration-title'>Teel people about yourself</div>
      <div className='personalDataConfiguration-subtitle'>
        Add a description about yourself and upload a picture of yourself
      </div>
      {loading ? (
        <ClipLoader
          color={backgroundLight}
          loading={true}
          cssOverride={styles.loadingSpinner}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <>
          <div style={styles.contentContainer}>
            <div style={styles.textAndButtonContainer}>
              <TextButton
                text={currentTextLanguage === TextLanguage.DE ? 'English' : 'German'}
                onClick={() =>
                  setCurrentTextLanguage(
                    currentTextLanguage === TextLanguage.DE ? TextLanguage.EN : TextLanguage.DE,
                  )
                }
                style={styles.languageButton}
              />
              <div className='personalDataConfiguration-subtitle'>
                You are{' '}
                <strong>
                  {' '}
                  currenly modifying the{' '}
                  {currentTextLanguage === TextLanguage.DE ? 'German' : 'English'} text
                </strong>
                , click on the button to modify{' '}
                <strong>
                  the {currentTextLanguage === TextLanguage.DE ? 'English' : 'German'} text
                </strong>
              </div>
              <TextEditor text={currentlyShownText} setText={handleTextChange} />
            </div>
            <div className='single-image-container'>
              {uploadingNewImage ? (
                <img src={URL.createObjectURL(imageToUpload as Blob)} alt='img' />
              ) : (
                <img src={image} alt='img' />
              )}
              <input type='file' onChange={handleChange} />
            </div>
          </div>
          <TextButton text='Save Modifications' onClick={onSaveModifications} />
          <SVGButton
            type={SVGButtonTypes.ArrowLeft}
            onClick={() => {
              navigate(-1)
            }}
            style={globalStyles.backButtonStyle}
            positionAbsolute
          />
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    color: background,
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
    width: '100vw',
  },
  languageButton: { marginBottom: 20 },
  contentContainer: {
    display: 'flex',
    flexDirection: FlexDirection.row,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '80%',
  },
  textAndButtonContainer: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '60%',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: FlexDirection.column,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '40%',
  },
  loadingSpinner: {
    display: 'block',
    margin: '0 auto',
    borderColor: background,
  },
}
