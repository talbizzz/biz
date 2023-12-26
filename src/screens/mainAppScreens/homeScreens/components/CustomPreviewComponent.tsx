import React from 'react'
import './styles.css'

export type CustomPreviewComponentProps = {
  icon?: string
  title: string
  subtitle: string
}

export const CustomPreviewComponent = (props: CustomPreviewComponentProps) => {
  return (
    <div className='preview-container'>
      <div className='preview-title'>{props.title}</div>
      <div className='preview-description-text'>{props.subtitle}</div>
      {props.icon && (
        <div className='preview-content-container'>
          <img src={props.icon} alt='icon' width={64} height={64} />
        </div>
      )}
    </div>
  )
}
