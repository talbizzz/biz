/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { background, backgroundLight } from '../assets/styles/colors'

type LabeledToggleProps = {
  label: string
  initial?: boolean
  onToggle?: (value: boolean) => void
}

export const LabeledToggle = ({ label, initial = false, onToggle }: LabeledToggleProps) => {
  const [isOn, setIsOn] = useState(initial)

  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // Prevent click from propagating to the container
    const newValue = !isOn
    setIsOn(newValue)
    onToggle?.(newValue)
  }

  return (
    <div style={styles.container} onClick={toggle}>
      <span style={styles.label}>{label}</span>
      <div style={{ ...styles.switch, backgroundColor: isOn ? background : backgroundLight }}>
        <div
          style={{
            ...styles.knob,
            left: isOn ? 26 : 2,
          }}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px 30px',
    gap: 12,
    cursor: 'pointer',
  },
  label: {
    fontSize: 16,
    color: background,
  },
  switch: {
    width: 50,
    height: 26,
    borderRadius: 13,
    position: 'relative' as const,
    transition: 'background-color 0.2s',
  },
  knob: {
    position: 'absolute' as const,
    top: 2,
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: '#fff',
    transition: 'left 0.2s',
  },
}
