import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../../types/GlobalStateType'
import { TextDisplayInput } from './textDisplayInput/TextDisplayInput'
import './styles.css'
import { background, getColorWithOpacity, primary, white } from '../../../assets/styles/colors'
import { NewLabelNewValueInput } from './textDisplayInput/NewLbelNewValueInput'
import { AdditionalDataType, UserSliceType } from '../../../types/UserSliceType'
import { postNewUserToFirestore } from '../../../connect/userInfoRequests'
import { setUser } from '../../../store/slices/userSlice/userSlice'
import { TextButton } from '../../../components/textButton/TextButton'
import { SVGButton, SVGButtonTypes } from '../../../components/svgButton/SVGButton'
import { useNavigate } from 'react-router-dom'
import { globalStyles } from '../../../assets/styles/globalStyles'

export const PersonalDataConfiguration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state: GlobalStateType) => state.userSlice.user)
  const [name, setName] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)
  const [familyName, setFamilyName] = useState(userData.familyName)
  const [profession, setProfession] = useState(userData.profession)
  const [additionalData, setAdditionalData] = useState<AdditionalDataType[]>(
    userData.additionalData,
  )

  const handleUpdate = async () => {
    const newUser: UserSliceType = {
      user: {
        email: email,
        familyName: familyName,
        fullName: (name + ' ' + familyName).toLowerCase(),
        name: name,
        profession: 'artist',
        uid: userData.uid,
        additionalData: additionalData ?? [],
      },
    }

    await postNewUserToFirestore(newUser.user.uid, newUser)
    dispatch(setUser(newUser))
    console.log('newUser: ', newUser)
  }

  const handleAddAdditionalData = (id: number) => {
    setAdditionalData([...additionalData, { label: '', value: '', id }])
  }

  const handleDeleteOneSingleAdditionalData = (id: number) => {
    const result = additionalData.filter((data) => data.id !== id)
    setAdditionalData(result)
  }

  const handleSingleAdditionalDataModification = (
    newLabel: string,
    newValue: string,
    id: number,
  ) => {
    const result = additionalData.map((data) => {
      if (data.id === id) {
        return { ...data, label: newLabel, value: newValue }
      }
      return data
    })
    setAdditionalData(result)
  }

  return (
    <div
      className='personalDataConfiguration-container'
      style={{ backgroundColor: getColorWithOpacity(white, 1) }}
    >
      <div
        className='personalDataConfiguration-inputs-container'
        style={{ backgroundColor: white, color: background }}
      >
        <div className='personalDataConfiguration-title'>Personal Data Configuration</div>
        <div className='personalDataConfiguration-subtitle'>
          Double-click on each field that you want to edit and then click on submit to save the
          changes
        </div>
        <div className='personalDataConfiguration-form-container'>
          <TextDisplayInput label={'Name'} value={name} onChange={setName} />
          <TextDisplayInput label={'Family Name'} value={familyName} onChange={setFamilyName} />
          <TextDisplayInput label={'E-mail'} value={email} onChange={setEmail} />
          <TextDisplayInput label={'Profession'} value={profession} onChange={setProfession} />
          {additionalData &&
            additionalData.map((data) => (
              <NewLabelNewValueInput
                key={data.id}
                label={data.label}
                value={data.value}
                onChange={(newLabel: string, newValue: string) =>
                  handleSingleAdditionalDataModification(newLabel, newValue, data.id)
                }
                onDelete={() => handleDeleteOneSingleAdditionalData(data.id)}
              />
            ))}
          <div style={styles.plusButtonContainer}>
            <SVGButton
              onClick={() => handleAddAdditionalData(additionalData.length)}
              type={SVGButtonTypes.Plus}
            />
          </div>
        </div>
        <TextButton
          onClick={handleUpdate}
          text={'Upload new Informations'}
          textColor={white}
          backgroundColor={background}
          style={styles.updateButton}
        />
      </div>
      <SVGButton
        type={SVGButtonTypes.ArrowLeft}
        onClick={() => {
          navigate(-1)
        }}
        style={globalStyles.backButtonStyle}
        positionAbsolute
      />
    </div>
  )
}

const styles = {
  plusButtonContainer: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  updateButton: {
    fontWeight: 'lighter',
    padding: '16px 32px',
    fontSize: 'large',
  },
}
