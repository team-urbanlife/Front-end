import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiClient } from '../apiClient'
import { PostDetailedScheduleType } from '@/types/postDetailedScheduleType'
import axios from 'axios'

function convertUnixTimestampToDate(exp: number) {
  // Unix 타임스탬프를 밀리초 단위로 변환하여 Date 객체 생성
  const date = new Date(exp * 1000) // exp는 초 단위이므로 밀리초로 변환

  // 사람이 읽을 수 있는 포맷으로 변환 (예: YYYY-MM-DD HH:mm:ss)
  return date.toLocaleString() // 현지 시간에 맞춘 날짜와 시간 출력
}

// function isTokenExpired(token: any) {
//   const base64Url = token.split('.')[1]
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//   const decodedPayload = JSON.parse(atob(base64))
//   // 만료 시간 변환
//   const readableDate = convertUnixTimestampToDate(decodedPayload.exp)
//   console.log('토큰 만료 시간:', readableDate)
//   const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (초 단위)
//   return decodedPayload.exp < currentTime // true면 토큰이 만료된 것
// }

// const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'

// export const refreshAccessToken = async () => {
//   const refreshToken = await AsyncStorage.getItem('refreshToken')
//   if (!refreshToken) {
//     console.log('리프레시 토큰이 없습니다. 로그인을 다시 하세요.')
//     return null
//   }

//   try {
//     const response = await axios.post(KAKAO_TOKEN_URL, null, {
//       params: {
//         grant_type: 'refresh_token',
//         client_id: 'YOUR_REST_API_KEY', // 카카오 REST API 키 입력
//         refresh_token: refreshToken,
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     })

//     const newAccessToken = response.data.access_token
//     await AsyncStorage.setItem('accessToken', newAccessToken)

//     return newAccessToken
//   } catch (error: any) {
//     console.error('액세스 토큰 갱신 중 오류 발생:', error.response.data)
//     return null
//   }
// }

export const postDetailedSchedule = async (
  data: PostDetailedScheduleType,
  scheduleId: number,
) => {
  try {
    let token = await AsyncStorage.getItem('accessToken')

    // 토큰이 만료되었으면 리프레시 토큰으로 갱신
    // if (isTokenExpired(token)) {
    //   console.log('토큰이 만료되었습니다. 새로운 액세스 토큰을 받아옵니다.')
    //   token = await refreshAccessToken()
    //   if (!token) {
    //     console.log('새로운 토큰을 가져오지 못했습니다. 로그인이 필요합니다.')
    //     return
    //   }
    // } else {
    //   console.log('토큰이 유효합니다.')
    // }

    console.log('상세일정api 파라미터에 포함시킬:', scheduleId)

    // API 요청
    const response = await apiClient.post(
      `/schedule-details/${scheduleId}/detailed-plans`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      console.log(data, '이렇게 서버에 잘 감')
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

//  validateStatus: function (status) {
//           return status < 500 // 500 미만의 상태 코드는 모두 허용
//         },
