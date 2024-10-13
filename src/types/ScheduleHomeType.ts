// 개별 일정의 타입
export interface Schedule {
  id: number
  title: string
  startDate: string // ISO 날짜 형식 (YYYY-MM-DD)
  endDate: string // ISO 날짜 형식 (YYYY-MM-DD)
  participants: number
}

// 전체 데이터를 포함하는 타입
export interface ScheduleResponse {
  content: Schedule[] // Schedule 객체 배열
  hasContent: boolean
  number: number // 현재 페이지 번호
  size: number // 페이지당 항목 수
  isFirst: boolean // 첫 번째 페이지 여부
  isLast: boolean // 마지막 페이지 여부
}
