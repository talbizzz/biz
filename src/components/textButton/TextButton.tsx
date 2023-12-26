import React from 'react'
import { background, white } from '../../assets/styles/colors'

type TextButtonProps = {
  text: string
  style?: React.CSSProperties
  backgroundColor?: string
  textColor?: string
  disabled?: boolean
  onClick: () => void
}

export const TextButton = (props: TextButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      style={{
        backgroundColor: props.backgroundColor ?? background,
        color: props.textColor ?? white,
        ...styles.container,
        ...props.style,
      }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

const styles = {
  container: {
    padding: 16,
    borderRadius: 16,
    border: 'none',
  },
}
