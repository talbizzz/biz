import React from 'react'
import './styles.css'
import Minus from '../../assets/Minus.svg'
import Plus from '../../assets/Plus.svg'
import Close from '../../assets/Close.svg'
import ArrowLeft from '../../assets/ArrowLeft.svg'
import ArrowRight from '../../assets/ArrowRight.svg'

export enum SVGButtonTypes {
  Minus,
  Plus,
  Close,
  ArrowLeft,
  ArrowRight,
}

type SVGButtonProps = {
  type: SVGButtonTypes
  style?: React.CSSProperties
  width?: number
  height?: number
  onClick: () => void
  positionAbsolute?: boolean
}

const mapSvgTypeToSrc = (svgType: SVGButtonTypes): string => {
  switch (svgType) {
    case SVGButtonTypes.Minus:
      return Minus
    case SVGButtonTypes.Plus:
      return Plus
    case SVGButtonTypes.Close:
      return Close
    case SVGButtonTypes.ArrowLeft:
      return ArrowLeft
    case SVGButtonTypes.ArrowRight:
      return ArrowRight
    default:
      return ''
  }
}

export const SVGButton = (props: SVGButtonProps) => {
  return (
    <img
      src={mapSvgTypeToSrc(props.type)}
      className={`svg-button ${props.positionAbsolute ? 'position-absolute' : ''}`}
      alt={'svg-button' + props.type}
      style={props.style}
      onClick={props.onClick}
      width={props.width ?? 64}
      height={props.height ?? 64}
    />
  )
}
