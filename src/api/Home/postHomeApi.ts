// /v1/posts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'
import { PostTravelScheduleType } from '@/types/PostTravelSchedule'

export const postTravelSchedule = async (data: PostTravelScheduleType) => {
  try {
    let token = await AsyncStorage.getItem('accessToken')

    console.log('여행 계획 데이터 이렇게 보내질거임', data)

    // API 요청
    const response = await apiClient.post(`/schedules`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      console.log('여행 계획 전송 성공')
      console.log(response.data)
    } else {
      console.log(response.status, response.headers, response.data)
    }
    return response.data
    //여행 일정을 업로드하면 여행 일정 id가 리턴 됨
  } catch (error: any) {
    if (error.response) {
      console.error('Error 여행 response:', error.response.data) // 서버 응답을 확인
      console.error('Error 여행 status:', error.response.status) // 상태 코드 확인
    } else {
      console.error('Error post detailed Plans:', error)
    }
    throw error
  }
}
