import React from 'react'
import { background, white } from '../../assets/styles/colors'

type TagProps = {
  value: string
  customizeTagValue: (value: string) => void
  handleSubmit: () => void
  style?: React.CSSProperties
}

export const CustomizableTag = (props: TagProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.customizeTagValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.handleSubmit()
    }
  }

  return (
    <div
      className='hover-elevation-effect'
      style={{
        ...styles.container,
        ...props.style,
      }}
    >
      <input
        type='text'
        value={props.value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={props.handleSubmit}
      />
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
    color: background,
    backgroundColor: white,
  },
}
