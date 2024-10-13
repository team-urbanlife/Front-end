export default interface ScheduleDetailType {
  id: string // 고유 ID
  title: string // 일정 제목
  imageUrl: string //사진 uri
  startTime: string // 시작 시간
  endTime: string // 종료 시간
  location?: string // 장소 (optional)
  totalPeople?: number // 참석자 리스트 (optional)
  createdAt?: Date // 생성 날짜
  updatedAt?: Date // 수정된 날짜 (optional)
}
