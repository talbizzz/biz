import React from 'react'
import './styles.css'
import { background, white } from '../../../../assets/styles/colors'
export type TextDisplayInputProps = {
  label: string
  value: string
  title?: string
  onChange: (newValue: string) => void
  onSubmit?: () => void
  onBlur?: () => void
  style?: React.CSSProperties
}

export const TextDisplayInput = (props: TextDisplayInputProps) => {
  const [isInput, setIsInput] = React.useState(false)

  const handleBlur = () => {
    setIsInput(false)
    props.onBlur && props.onBlur()
  }

  return (
    <div className='text-display-input-container' style={{ ...props.style, color: background }}>
      <div className='cell-design text-display-input-label'>{props.label}</div>
      {isInput ? (
        <input
          type={'text'}
          value={props.value}
          className='cell-design text-display-input-input'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(event.target.value)
          }
          onBlur={handleBlur}
          onFocus={() => setIsInput(true)}
        />
      ) : (
        <div
          className='cell-design text-display-input-value'
          onClick={() => setIsInput(true)}
          style={{ color: props.value === '' ? 'gray' : white }}
        >
          {props.value === '' ? 'Press here to add value' : props.value}
        </div>
      )}
    </div>
  )
}
