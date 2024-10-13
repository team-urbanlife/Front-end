import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

const BACKEND_URL = 'https://dev.wegotoo.net'

export async function fetchMySchedules() {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(
    BACKEND_URL + '/v1/schedules?page=1&size=4',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  //console.log('모집글 목록 조회', response.data)
  const myScheduleS = []

  for (const item of response.data.data.content) {
    console.log('나의 일정 목록 조회 시 각각의 일정 확인', item)
    item.imageUrl = '../../assets/travel.png'
    myScheduleS.push(item)
  }

  return myScheduleS
}

export async function fetchUserInfo() {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(BACKEND_URL + '/v1/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
    },
  })
  console.log(response.data.data)
  return response.data.data
}
