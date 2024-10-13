///v1/schedules/1/schedule-details
import { apiClient } from '../apiClient'

export const getHomePost = async () => {
  try {
    const response = await apiClient.get(`/posts?page=1&size=4`)

    if (response.status === 200) {
      console.log('게시글 홈 불러오기 성공')
    }
    return response.data
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data) // 서버 응답을 확인
      console.error('Error status:', error.response.status) // 상태 코드 확인
    } else {
      console.error('Error post detailed Plans:', error)
    }
    throw error
  }
}
