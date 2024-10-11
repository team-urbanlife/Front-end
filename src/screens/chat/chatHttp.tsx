import axios from 'axios'
//import { GatheringData } from '../../components/GatheringRegister/GatheringRegisterForm'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BACKEND_URL = 'https://dev.wegotoo.net'

export async function fetchChatRooms() {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(BACKEND_URL + '/v1/chat-rooms', {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
    },
  })
  console.log('채팅방 전체 조회', response.data)
  const chatRoomS = []

  for (const item of response.data.data) {
    console.log('채팅방 전체 조회 시 각각의 채팅방 확인', item)
    item.unreadCount = 0
    chatRoomS.push(item)
  }

  return chatRoomS
}

export async function fetchChatRoomDetail(roomId: number) {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.get(
    BACKEND_URL + '/v1/chat-rooms/' + roomId.toString(),
    //BACKEND_URL + '/v1/chat-rooms/1',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  /* console.log(
    '채팅방 단건 조회에서 토큰',
    response.request._headers.authorization.split(' ')[1],
  ) */
  //console.log('채팅방 단건 조회에서 토큰', response)
  console.log('채팅방 단건 조회', response.data)
  return response.data.data.users
}

export async function fetchChatHistory(roomId: number, cursor: string | null) {
  // https://dev.wegotoo.net/chat-rooms/1/chats?size=20
  console.log('fetchChatHistory함수 속 roomId는?', roomId)
  const accessToken = await AsyncStorage.getItem('accessToken')

  var response = null

  if (!cursor) {
    response = await axios.get(
      BACKEND_URL + '/v1/chat-rooms/' + roomId.toString() + '/chats?size=10',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
        },
      },
    )
  } else {
    response = await axios.get(
      BACKEND_URL +
        '/v1/chat-rooms/' +
        roomId.toString() +
        '/chats?cursor=' +
        cursor +
        '&size=10',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
        },
      },
    )
  }

  console.log('채팅내역 조회', response.data)

  return [
    response.data.data.content,
    response.data.data.hasNext,
    response.data.data.nextCursor,
  ]
}

export async function createChatRoom(accompanyId: number) {
  const accessToken = await AsyncStorage.getItem('accessToken')
  const response = await axios.post(
    BACKEND_URL + '/v1/chat-rooms',
    { accompanyId: accompanyId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
      },
    },
  )
  console.log('채팅방 생성후 응답데이터 조회', response.data)
  console.log(
    '채팅방 생성후 최종적으로 리턴하는 데이터 조회',
    response.data.data.id,
  )
  return response.data.data.id
}
