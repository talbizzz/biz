import { useEffect, useState } from 'react'
import { ImageType } from '../../../../../../types/AssetsTypes'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentImage } from '../../../../../../store/slices/gallerySlice/gallerySlice'

export const useHandleGalleryConfigurationState = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOpenCurrentImage = (image: ImageType) => {
    dispatch(setCurrentImage(image))
    navigate('/gallery-configuration/view-or-configure-image')
  }

  return { handleOpenCurrentImage }
}
