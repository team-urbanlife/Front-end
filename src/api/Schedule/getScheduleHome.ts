// /schedules?page=1&size=4
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'

export const getScheduleHome = async (page: number, size: number) => {
  try {
    let token = await AsyncStorage.getItem('accessToken')

    const response = await apiClient.get(
      `/schedules?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      console.log('여행 일정 불러오기 성공')
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
