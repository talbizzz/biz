import React from 'react'
import { TextButton } from '../../components/textButton/TextButton'
import { FlexDirection } from '../../constants/StylingConstants'
import { SVGButton, SVGButtonTypes } from '../../components/svgButton/SVGButton'
import { useNavigate } from 'react-router-dom'
import { globalStyles } from '../../assets/styles/globalStyles'
import { useHandleAuthentication } from './useHandleAuthentication'
import { ClipLoader } from 'react-spinners'
import { background, backgroundLight } from '../../assets/styles/colors'

export const ProfileScreen = () => {
  const navigate = useNavigate()
  const { handleUserSignOut } = useHandleAuthentication()
  const [loading, setLoading] = React.useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    handleUserSignOut()
      .then(() => {
        setLoading(false)
      })
      .finally(() => {
        navigate('/authentication')
      })
  }

  return (
    <div style={styles.container}>
      {loading ? (
        <ClipLoader
          color={backgroundLight}
          loading={true}
          cssOverride={globalStyles.loadingSpinner}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <>
          <TextButton text='Disconnect' onClick={handleSignOut} backgroundColor='red' />
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
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
}
