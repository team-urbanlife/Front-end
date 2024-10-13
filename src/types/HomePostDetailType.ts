export type Block = {
  type: 'T' | 'IMAGE' | 'WRITE'
  text: string
}

export type HomePostDetailType = {
  id: number
  title: string
  userName: string
  userProfileImage: string
  contents: Block[]
  views: number
  registeredDateTime: string
  likeCount: number
}
