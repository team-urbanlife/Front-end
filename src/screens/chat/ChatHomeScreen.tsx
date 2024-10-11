import React, { useCallback, useState } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native'
import { useChat } from '@/context/chat-context' // 전역 상태로 chatRooms를 가져오기
import GatheringHomeHeader from '../gathering/GatheringHomeHeader'
import { GlobalStyles } from '@/constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EventSource from 'react-native-event-source'
import { fetchChatRooms } from './chatHttp'

// 타입 정의
interface ChatRoom {
  chatRoomId: number
  accompanyId: number
  accompanyTitle: string
  otherUserProfileImage: string
  lastMessage: string
  lastMessageCreateAt: string
  unreadCount: number
}

// 네비게이션 타입 정의
type RootStackParamList = {
  ChatRoomDetail: { roomId: number; title: string }
}

// 날짜 포맷 함수
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()

  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()

  if (isToday) {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    return `${period} ${formattedHours}:${minutes}`
  } else {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
  }
}

const ChatRoomItem: React.FC<{ item: ChatRoom }> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handlePress = () => {
    navigation.navigate('ChatRoomDetail', {
      roomId: item.chatRoomId,
      title: item.accompanyTitle,
    })
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.chatRoomItem}>
        <Image
          source={{ uri: item.otherUserProfileImage }}
          style={styles.chatImage}
        />
        <View style={styles.chatDetails}>
          <View style={styles.participantInfo}>
            <Ionicons
              name="person"
              size={13}
              color={GlobalStyles.colors.signature}
            />
            <Text style={styles.participants}>2</Text>
          </View>
          <Text style={styles.chatTitle}>{item.accompanyTitle}</Text>
          <Text style={styles.chatDescription}>{item.lastMessage}</Text>
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.chatTime}>
            {formatDate(item.lastMessageCreateAt)}
          </Text>
          {item.unreadCount != 0 && (
            <TouchableOpacity style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ChatHomeScreen: React.FC = () => {
  const { chatRooms, setChatRooms } = useChat() // 전역 상태에서 chatRooms와 setChatRooms 가져오기
  const [error, setError] = useState<string | null>(null)

  // SSE 구독 및 이벤트 처리
  /* useFocusEffect(
    useCallback(() => {
      const fetchTokenAndConnectSSE = async () => {
        const token = await AsyncStorage.getItem('accessToken')

        const sseUrl = 'https://dev.wegotoo.net/v1/notification'

        const eventSource = new EventSource(sseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'text/event-stream',
          },
        })

        console.log('SSE 구독 시작', token)

        eventSource.addEventListener('Chat Notification', (event) => {
          try {
            if (event.data) {
              console.log('이벤트 데이터 확인', event.data)
              const chatRoomId = +event.data.split('\n')[0]
              const receivedEventMsg = event.data.split('\n')[1]

              const parsedData = {
                chatRoomId: chatRoomId,
                message: receivedEventMsg,
              }

              if (parsedData && parsedData.chatRoomId) {
                setChatRooms((prevChatRooms: any[]) => {
                  const chatRoomIndex = prevChatRooms.findIndex(
                    (room) => room.chatRoomId === parsedData.chatRoomId,
                  )

                  if (chatRoomIndex === -1) return prevChatRooms

                  const updatedChatRoom = {
                    ...prevChatRooms[chatRoomIndex],
                    lastMessage:
                      parsedData.message ||
                      prevChatRooms[chatRoomIndex].lastMessage,
                    unreadCount: prevChatRooms[chatRoomIndex].unreadCount + 1,
                    lastMessageCreateAt: new Date().toISOString(),
                  }

                  const updatedChatRooms = [...prevChatRooms]
                  updatedChatRooms[chatRoomIndex] = updatedChatRoom

                  return updatedChatRooms
                })
              }
            } else {
              console.warn('Received null or undefined data from SSE')
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error)
          }
        })

        eventSource.addEventListener('error', (event) => {
          console.error('SSE Error:', event)
          setError('An error occurred while receiving SSE messages.')
        })

        return () => {
          console.log('SSE 구독 종료')
          eventSource.close()
        }
      }

      fetchTokenAndConnectSSE()
    }, [chatRooms]), // chatRooms 상태 변경 시 콜백 재실행
  ) */

  // 채팅방 정보 불러오기
  useFocusEffect(
    useCallback(() => {
      const getChatRooms = async () => {
        try {
          const fetchedChatRooms = await fetchChatRooms()
          setChatRooms(fetchedChatRooms)
        } catch (error) {
          console.error('Error fetching chat rooms:', error)
        }
      }

      getChatRooms()
    }, [setChatRooms]), // setChatRooms가 변경될 때만 실행
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <GatheringHomeHeader selectedLocations={null} identifier={'ChatHome'} />
      </View>

      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.chatRoomId.toString()}
        renderItem={({ item }) => <ChatRoomItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        extraData={chatRooms} // 상태 변경 시 리렌더링 강제
        //initialNumToRender={10} // 처음 렌더링할 아이템 수
        // windowSize={5} // 한 번에 렌더링할 창 크기
      />
    </View>
  )
}

export default ChatHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatRoomItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chatDescription: {
    fontSize: 14,
    color: '#666',
  },
  chatInfo: {
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'flex-end',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: -6,
  },
  participants: {
    fontSize: 14,
    color: GlobalStyles.colors.signature,
    marginLeft: 4,
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  unreadBadge: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  headerContainer: {
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
})
