export type AdditionalDataType = {
  id: number
  label: string
  value: string
}

export type UserSliceType = {
  user: {
    uid: string
    email: string
    familyName: string
    fullName: string
    name: string
    profession: string
    additionalData: AdditionalDataType[]
  }
}
