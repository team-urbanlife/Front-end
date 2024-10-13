import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

const BACKEND_URL = 'https://dev.wegotoo.net'

export async function storePost(postData: any) {
  //const response = await axios.post(BACKEND_URL + '/v1/accompanies', gatheringData)
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await axios.post(BACKEND_URL + '/v1/posts', postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    })
    console.log('게시글 생성 후 데이터 확인', response.data.data)
    console.log('게시글 생성 후 게시글 아이디 확인', response.data.data.id)
    return response.data.data.id
  } catch (error) {
    console.log('게시글 생성 시 오류', error)
  }
  //console.log('모집글 생성 후 응답데이터', response)
  //const id = response.data.data.id
  //const registeredDateTime = response.data.data.registeredDateTime
  //const userName = response.data.data.userName
  return
}

export async function fetchPostDetail(postId: number) {
  const response = await axios.get(
    BACKEND_URL + '/v1/posts/' + postId.toString(),
  )
  console.log('게시글 단건 조회', response.data)

  return response.data.data
}

export async function fetchFavoritePosts() {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(
    BACKEND_URL + '/v1/users/likes/posts?page=1&size=4',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  //console.log('모집글 목록 조회', response.data)
  const postS = []

  for (const item of response.data.data.content) {
    //console.log('나의 모집글 목록 조회 시 각각의 모집글 확인', item)
    postS.push(item)
  }

  return postS
}

export async function doLike(postId: number) {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.post(
    BACKEND_URL + '/v1/likes/posts/' + postId.toString(),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  console.log(response)
}

export async function doUnLike(postId: number) {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.delete(
    BACKEND_URL + '/v1/likes/posts/' + postId.toString(),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  console.log(response)
}

export async function getLikedPostIds() {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(BACKEND_URL + '/v1/likes/posts', {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
    },
  })
  console.log(response.data.data.postIds)
  return response.data.data.postIds
}

export async function doTest() {
  const scheduleid = 1
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.post(
    BACKEND_URL + `/v1/schedules/${scheduleid}/schedule-details`,
    {
      date: '2024-09-01',
      name: '장소 이름',
      latitude: 0.0,
      longitude: 0.0,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  console.log(response)
}
