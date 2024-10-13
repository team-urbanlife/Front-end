import axios from 'axios'
import Gathering from './type/GatheringType'
import { GatheringData } from '../../components/GatheringRegister/GatheringRegisterForm'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BACKEND_URL = 'https://dev.wegotoo.net'

export async function storeGathering(gatheringData: GatheringData) {
  //const response = await axios.post(BACKEND_URL + '/v1/accompanies', gatheringData)

  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.post(
    BACKEND_URL + '/v1/accompanies',
    gatheringData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  //console.log('모집글 생성 후 응답데이터', response)
  const id = response.data.data.accompanyId
  const registeredDateTime = response.data.data.registeredDateTime
  const userName = response.data.data.userName
  return [+id, registeredDateTime, userName]
}

export async function fetchGatherings() {
  const response = await axios.get(
    BACKEND_URL + '/v1/accompanies?page=1&size=4',
  )
  console.log('모집글 목록 조회', response.data)
  const gatheringS = []

  for (const item of response.data.data.content) {
    console.log('모집글 목록 조회 시 각각의 모집글 확인', item)
    gatheringS.push(item)
  }

  return gatheringS
}

export async function fetchGatheringDetail(gatheringId: number) {
  const response = await axios.get(
    BACKEND_URL + '/v1/accompanies/' + gatheringId.toString(),
  )
  console.log('모집글 단건 조회', response.data)

  return response.data.data
}

export function updateGathering(id: string, gatheringData: Gathering) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, gatheringData)
}

export function deleteGathering(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}

export async function fetchMyGatherings() {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(BACKEND_URL + '/v1/users/accompanies', {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
    },
  })
  //console.log('모집글 목록 조회', response.data)
  const gatheringS = []

  for (const item of response.data.data.content) {
    console.log('나의 모집글 목록 조회 시 각각의 모집글 확인', item)
    gatheringS.push(item)
  }

  return gatheringS
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
