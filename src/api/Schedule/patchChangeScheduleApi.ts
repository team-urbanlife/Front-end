import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'
import { PostDetailedScheduleType } from '@/types/postDetailedScheduleType'
import axios from 'axios'

export const patchChangeSchedule = async (
  scheduleDetailsId: number,
  data: {
    detailedPlanId: number
    sequence: number
  }[],
) => {
  try {
    let token = await AsyncStorage.getItem('accessToken')

    // API 요청
    const response = await apiClient.patch(
      `/scheduleDetails/${scheduleDetailsId}/detailed-plans/move`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      console.log(data, '순서 수정 서버에 잘 감')
    } else {
      console.log(response.status, response.headers, response.data)
    }
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
