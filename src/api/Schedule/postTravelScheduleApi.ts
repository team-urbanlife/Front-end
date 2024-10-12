import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'
import { PostDetailedScheduleType } from '@/types/postDetailedScheduleType'
import axios from 'axios'
import { PostTravelScheduleType } from '@/types/PostTravelSchedule'

export const postTravelSchedule = async (data: PostTravelScheduleType) => {
  try {
    let token = await AsyncStorage.getItem('accessToken')

    console.log('상세일정 API에 보낼 토큰:', token)

    // API 요청
    const response = await apiClient.post(`/schedules`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      console.log('여행 계획 응답 성공')
    } else {
      console.log(response.status, response.headers, response.data)
    }
    return response.data //여행 일정을 업로드하면 여행 일정 배열이 리턴 됨
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
