import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'
import { PostDetailedScheduleType } from '@/types/postDetailedScheduleType'
import axios from 'axios'

export const getCities = async () => {
  try {
    // API 요청
    const response = await apiClient.get(`/cities`)

    if (response.status === 200) {
      console.log('장소 데이터 불러오기 성공')
    } else {
      console.log(response.status, response.headers, response.data)
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
