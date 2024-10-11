export type Block = {
  type: 'T' | 'IMAGE' | 'WRITE'
  text: string
}

export type HomePostDetailType = {
  id: number
  title: string
  name: string
  profileImage: string
  picture: string
  contents: Block[]
  createdAt: string
}
