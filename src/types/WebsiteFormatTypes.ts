export type SectionsType = {
  id: string
  title: string
  description: string
  comments: string
}

export type WebsiteType = {
  scrollable: boolean
  onePage: boolean
}

export type WebsiteConfigurationSliceType = {
  sections: SectionsType[]
  websiteType: string
}
