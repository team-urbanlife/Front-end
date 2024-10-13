///v1/schedules/1/schedule-details
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'
import { PostDetailedScheduleType } from '@/types/postDetailedScheduleType'
import axios from 'axios'

export const getDetailedPlans = async (scheduleId: number) => {
  try {
    console.log('받아온 id', scheduleId)

    let token = await AsyncStorage.getItem('accessToken')

    const response = await apiClient.get(
      `/schedules/${scheduleId}/schedule-details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      console.log('상세 일정 불러오기 성공')
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
