// 기간 | 제목 | 내용 | 작성자 이름
// 댓글 수 | 작성일 | 지역

export default interface Gathering {
  id: string
  period: string
  title: string
  content: string
  author?: string
  commentCnt?: number
  registerDate: Date
  location?: string
}
