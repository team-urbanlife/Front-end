// 기간 | 제목 | 내용 | 작성자 이름
// 댓글 수 | 작성일 | 지역

export default interface Gathering {
  accompanyId: number
  startDate: string
  endDate: string
  title: string
  content?: string
  userName?: string
  registeredDateTime: string
  views?: number
  likeCount?: number
  location: string
  personnel: number
  gender: string
  startAge: number
  endAge: number
  cost: number
  userProfileImage?: string
}
