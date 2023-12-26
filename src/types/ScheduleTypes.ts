import { PerformerType } from './AssetsTypes'

export type AppointmentType = {
  id: string
  title: string | undefined
  location: string | undefined
  address: string | undefined
  date: string
  time?: string
  eventLink: string | undefined
  performers?: PerformerType[]
}
