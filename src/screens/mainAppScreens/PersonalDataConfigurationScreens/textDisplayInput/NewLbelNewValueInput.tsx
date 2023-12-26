import React from 'react'
import { background, white } from '../../../../assets/styles/colors'
import { SVGButton, SVGButtonTypes } from '../../../../components/svgButton/SVGButton'

type NewLabelNewValueInputProps = {
  onChange: (newLabel: string, newValue: string) => void
  onDelete: () => void
  label: string
  value: string
}
export const NewLabelNewValueInput = (props: NewLabelNewValueInputProps) => {
  const [newLabel, setNewLabel] = React.useState(props.label ?? '')
  const [newValue, setNewValue] = React.useState(props.value ?? '')
  const [labelCanBeUpdated, setLabelCanBeUpdated] = React.useState(props.label ? false : true)
  const [valueCanBeUpdated, setValueCanBeUpdated] = React.useState(props.value ? false : true)
  const handleLabelUpdate = (newLabel: string) => {
    setNewLabel(newLabel)
    props.onChange(newLabel, newValue)
  }

  const handleValueUpdate = (newValue: string) => {
    setNewValue(newValue)
    props.onChange(newLabel, newValue)
  }

  return (
    <div className='text-display-input-container' style={{ color: background }}>
      {(labelCanBeUpdated || valueCanBeUpdated) && (
        <div style={styles.minusButtonContainer}>
          <SVGButton
            onClick={() => {
              props.onDelete()
            }}
            type={SVGButtonTypes.Minus}
            width={32}
            height={32}
            style={styles.minusButton}
          />
        </div>
      )}
      {labelCanBeUpdated ? (
        <input
          type='text'
          value={newLabel}
          className='cell-design text-display-input-labelInput'
          onChange={(event) => handleLabelUpdate(event.target.value)}
          onBlur={() => setLabelCanBeUpdated(false)}
        />
      ) : (
        <div
          className='cell-design text-display-input-label'
          onClick={() => setLabelCanBeUpdated(true)}
        >
          {newLabel}
        </div>
      )}
      {valueCanBeUpdated ? (
        <input
          type='text'
          value={newValue}
          className='cell-design text-display-input-input'
          onChange={(event) => handleValueUpdate(event.target.value)}
          onBlur={() => setValueCanBeUpdated(false)}
        />
      ) : (
        <div
          className='cell-design text-display-input-value'
          onClick={() => setValueCanBeUpdated(true)}
        >
          {newValue}
        </div>
      )}
    </div>
  )
}

const styles = {
  minusButton: {
    marginRight: 5,
  },
  minusButtonContainer: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
}
