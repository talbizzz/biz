import React from 'react'
import { white } from '../../../assets/styles/colors'
import './style.css'

export type TextInputProps = {
  label: string
  value: string
  title?: string
  onChange: (newValue: string) => void
}

export const TextInput = (porps: TextInputProps) => {
  const { label, value, onChange, title } = porps
  return (
    <div className='textInput-container'>
      <div className='textInput-icon'>@</div>
      <div className='textInput-innerContainer'>
        <div className='textInput-label' style={{ color: white }}>
          {title ?? label}
        </div>
        <input
          type={label}
          value={value}
          className='textInput-input'
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}
