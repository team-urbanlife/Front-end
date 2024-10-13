// /likes/posts/1
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'

export const postLikes = async (postId: number) => {
  try {
    let token = await AsyncStorage.getItem('accessToken')

    console.log('좋아요 누른 게시글 아이디', postId)

    // API 요청
    const response = await apiClient.post(
      `/likes/posts/${postId}`,
      {}, // 빈 객체를 두 번째 인자로 전달 (본문에 데이터가 없으면 빈 객체로)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      console.log('좋아요 전송 성공')
      console.log(response.data)
    } else {
      console.log(response.status, response.headers, response.data)
    }
    return response
  } catch (error: any) {
    if (error.response) {
      console.error('Error Likes response:', error.response.data) // 서버 응답을 확인
      console.error('Error Likes status:', error.response.status) // 상태 코드 확인
    } else {
      console.error('Error Likes:', error)
    }
    throw error
  }
}
