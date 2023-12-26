import React from 'react'
import { background, white } from '../../assets/styles/colors'

export type TagProps = {
  value: string
  selected: boolean
  onPress?: () => void
  style?: React.CSSProperties
}

export const Tag = (props: TagProps) => {
  return (
    <div
      className='hover-elevation-effect'
      style={{
        ...styles.container,
        backgroundColor: props.selected ? background : white,
        color: props.selected ? white : background,
        ...props.style,
      }}
      onClick={props.onPress}
    >
      {props.value}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    borderRadius: 20,
    width: 'min-content',
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: background,
    cursor: 'pointer',
    justifyContent: 'center',
    margin: 5,
  },
}
