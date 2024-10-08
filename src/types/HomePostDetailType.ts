export type ContentType = {
  type: 'T' | 'IMAGE'
  text: string
}

export type HomePostDetailType = {
  id: number
  title: string
  name: string
  profileImage: string
  picture: string
  contents: ContentType[]
  createdAt: string
}
