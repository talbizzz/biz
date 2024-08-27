import React from 'react'
import { background, backgroundLight } from '../../assets/styles/colors'
import './styles.css'

export type PressableCardProps = {
  onClick: () => void
  children?: React.ReactNode
  className?: string
}

export const PressableCard = ({ className, children, onClick }: PressableCardProps) => {
  const [bgColor, setBgColor] = React.useState(backgroundLight)
  const textColor = bgColor === backgroundLight ? background : backgroundLight

  const handleMouseEnter = () => {
    setBgColor(background)
  }

  const handleMouseLeave = () => {
    setBgColor(backgroundLight)
  }

  return (
    <div
      className={`card-container ${className}`}
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
