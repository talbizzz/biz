import React from 'react'
import { TextDisplayInput } from '../../../PersonalDataConfigurationScreens/textDisplayInput/TextDisplayInput'
import { PerformerType } from '../../../../../types/AssetsTypes'
import { SVGButton, SVGButtonTypes } from '../../../../../components/svgButton/SVGButton'

type ModulablePerfomerType = { uid: string } & PerformerType

type PerformerInputProps = {
  performerName: string
  performerRole: string
  performerId: string
  performers: ModulablePerfomerType[]
  setPerformers: (newPerformers: ModulablePerfomerType[]) => void
}

export const PerformerInput = (props: PerformerInputProps) => {
  const [performerName, setPerformerName] = React.useState<string>(props.performerName)
  const [performerRole, setPerformerRole] = React.useState<string>(props.performerRole)

  const handlePerformerNameChange = (value: string) => {
    setPerformerName(value)
    props.setPerformers(
      props.performers.map((performer: ModulablePerfomerType) =>
        performer.uid === props.performerId ? { ...performer, name: value } : performer,
      ),
    )
  }

  const handlePerformerRoleChange = (value: string) => {
    setPerformerRole(value)
    props.setPerformers(
      props.performers.map((performer: ModulablePerfomerType) =>
        performer.uid === props.performerId ? { ...performer, role: value } : performer,
      ),
    )
  }

  const handlePerformerDelete = () => {
    props.setPerformers(props.performers.filter((performer) => performer.uid !== props.performerId))
  }

  return (
    <>
      <TextDisplayInput
        label={'performer name'}
        value={performerName}
        onChange={handlePerformerNameChange}
        style={styles.singlePerformerContainer}
      />
      <TextDisplayInput
        label={'performer role'}
        value={performerRole}
        onChange={handlePerformerRoleChange}
        style={styles.singlePerformerContainer}
      />
      <SVGButton type={SVGButtonTypes.Minus} onClick={handlePerformerDelete} />
    </>
  )
}

const styles = {
  singlePerformerContainer: {
    width: '50%',
    height: 'auto',
  },
}
