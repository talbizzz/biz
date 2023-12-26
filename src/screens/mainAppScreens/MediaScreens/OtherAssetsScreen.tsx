import ReactPlayer from 'react-player/youtube'
import './styles.css'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../types/GlobalStateType'
import React from 'react'

export const OtherAssetsScreen = () => {
  const youtubeVideos = useSelector(
    (state: GlobalStateType) => state.youtubeVideoSlice.youtubeVideos,
  )
  const audios = useSelector((state: GlobalStateType) => state.audiosSlice.audios)

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <div
      id='media'
      className={`media-container media-container${isTabletOrMobile ? '-mobile' : ''}`}
    >
      <h1>MEDIA</h1>
      <div className={`media-internal-container${isTabletOrMobile ? '-mobile' : ''}`}>
        <div className={`videos-wrapper${isTabletOrMobile ? '-mobile' : ''}`}>
          {youtubeVideos?.map((video: { url: string }, index: number) => (
            <div key={index} className={`single-video-wrapper${isTabletOrMobile ? '-mobile' : ''}`}>
              <ReactPlayer url={video.url} width={'auto'} height={'30vh'} />
            </div>
          ))}
        </div>
        <div className={`audios-wrapper${isTabletOrMobile ? '-mobile' : ''}`}>
          {audios.map(
            (
              audio: { title: string; url: string; performers: { name: string; role: string }[] },
              index: number,
            ) => (
              <div key={index}>
                <audio controls style={{ height: '4vh' }}>
                  <source src={audio.url} />
                </audio>
                <span>{audio.title}</span>
                {audio.performers.map(
                  (performer: { name: string; role: string }, index: number) => (
                    <div key={index}>
                      <span className='audio-performers'>
                        {performer.name + ' - ' + performer.role}
                      </span>
                    </div>
                  ),
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
