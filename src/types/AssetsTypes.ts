export type PerformerType = {
  name: string
  role: string
}

export type AudioType = {
  uid: string
  url: string
  title: string
  performers: PerformerType[]
}

export type YoutubeVideoType = {
  url: string
}

export type ImageType = {
  uid: string
  url: string
  copyright?: string
  title?: string
  description?: string
}
