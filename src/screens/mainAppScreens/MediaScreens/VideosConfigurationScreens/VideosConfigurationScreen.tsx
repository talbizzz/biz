import React, { useEffect } from 'react'
import { useHandleYoutubeVideosRequests } from './utils/useHandleYoutubeVideosRequests'
import ReactPlayer from 'react-player'
import './styles.css'
import { background } from '../../../../assets/styles/colors'
import { SVGButton, SVGButtonTypes } from '../../../../components/svgButton/SVGButton'
import { useNavigate } from 'react-router-dom'
import { TextButton } from '../../../../components/textButton/TextButton'
import { TextDisplayInput } from '../../PersonalDataConfigurationScreens/textDisplayInput/TextDisplayInput'
import { globalStyles } from '../../../../assets/styles/globalStyles'

export const VideosConfigurationScreen = () => {
  const {
    updatedYoutubeVideosList,
    newYoutubeVideoURL,
    deleteYoutubeVideo,
    setNewYoutubeVideoURL,
    updateYoutubeVideosList,
    uploadNewVideos,
  } = useHandleYoutubeVideosRequests()
  const [newVideoField, setNewVideoField] = React.useState(false)
  const navigate = useNavigate()
  const handlePlus = () => {
    if (newYoutubeVideoURL === '') setNewVideoField(true)
    else updateYoutubeVideosList()
  }

  console.log('updatedYoutubeVideosList', updatedYoutubeVideosList)

  return (
    <div className='videos-external-container' style={{ color: background }}>
      <div className='personalDataConfiguration-title'>Videos Upload and modification</div>
      <div className='personalDataConfiguration-subtitle'>
        Click on the plus container to upload a new Video, and click on any image to modify it
      </div>
      <div style={{ ...styles.videosContainer, flexDirection: 'column', overflowY: 'scroll' }}>
        {updatedYoutubeVideosList?.map((video, index) => (
          <div key={index} style={styles.singleVideoContainer} className={'single-video-container'}>
            <SVGButton type={SVGButtonTypes.Minus} onClick={() => deleteYoutubeVideo(video.url)} />
            <ReactPlayer url={video.url} width={'85%'} height={'30vh'} />
          </div>
        ))}
        {newVideoField && (
          <TextDisplayInput
            label={'url'}
            value={newYoutubeVideoURL}
            onChange={setNewYoutubeVideoURL}
            onSubmit={updateYoutubeVideosList}
            onBlur={updateYoutubeVideosList}
          />
        )}
        <SVGButton onClick={handlePlus} width={64} height={64} type={SVGButtonTypes.Plus} />
      </div>
      <div style={styles.submitButtonContainer}>
        <TextButton text={'Update Videos'} onClick={uploadNewVideos} />
      </div>
      <SVGButton
        type={SVGButtonTypes.ArrowLeft}
        onClick={() => navigate(-1)}
        style={globalStyles.backButtonStyle}
        positionAbsolute
      />
    </div>
  )
}

const styles = {
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2%',
  },
  videosContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '59vh',
  },
  singleVideoContainer: {
    width: '60%',
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}
