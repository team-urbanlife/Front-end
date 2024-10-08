import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
} from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Client } from '@stomp/stompjs'
import { fetchChatHistory, fetchChatRoomDetail } from './chatHttp'
import { TextEncoder, TextDecoder } from 'text-encoding'
// 글로벌 설정
global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder

type RootStackParamList = {
  ChatHomeScreen: undefined
  ChatRoomDetail: { roomId: number; title: string }
}

interface ChatRoomDetailScreenProps {
  route: RouteProp<RootStackParamList, 'ChatRoomDetail'>
}

interface ChatMessage {
  id: string
  senderId: number
  chatRoomId: number
  senderName: string
  senderProfileImage: string
  message: string
  createAt: string
}

type ChatMessagesResponse = ChatMessage[]

const ChatRoomDetail: React.FC<ChatRoomDetailScreenProps> = ({ route }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessagesResponse>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(false)
  const stompClient = useRef<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [subId, setSubId] = useState<string | null>(null)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const flatListRef = useRef<FlatList<ChatMessage>>(null)
  const navigation = useNavigation()

  const roomId = +route.params.roomId
  const roomTitle = route.params.title

  useLayoutEffect(() => {
    navigation.setOptions({
      title: roomTitle,
    })
  }, [navigation, roomTitle])

  useEffect(() => {
    const loadSubId = async () => {
      const storedSubId = await AsyncStorage.getItem('subId')
      setSubId(storedSubId)
    }
    loadSubId()

    /* const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true)
        flatListRef.current?.scrollToEnd({ animated: true })
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false)
        flatListRef.current?.scrollToEnd({ animated: true })
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    } */
  }, [])

  const loadChatHistory = async (cursor: string | null = null) => {
    try {
      setLoading(true)
      const [chatHistory, hasNext, nextCursor] = await fetchChatHistory(
        roomId,
        cursor,
      )
      chatHistory.sort((a: ChatMessage, b: ChatMessage) => {
        return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
      })
      setMessages((prevMessages) => [...chatHistory, ...prevMessages])
      setHasNext(hasNext)
      setNextCursor(nextCursor)
    } catch (error) {
      console.error('Error fetching chatHistory:', error)
    } finally {
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    const loadChatRoom = async () => {
      try {
        const users = await fetchChatRoomDetail(roomId)
        console.log('users :: ', users)
      } catch (error) {
        console.error('Error fetching chatRoom:', error)
      }
    }

    loadChatRoom()
    loadChatHistory()
  }, [route.params.roomId])

  useEffect(() => {
    const connectStomp = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        if (!accessToken) {
          console.error('Access token not found')
          return
        }

        const client = new Client({
          brokerURL: 'wss://dev.wegotoo.net/ws',
          connectHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
          debug: (str) => {
            console.log(str)
          },
          onConnect: (frame) => {
            console.log('STOMP connected:', frame)
            setIsConnected(true)

            client.subscribe(`/topic/chat-rooms/${roomId}`, (message) => {
              const receivedMessage = JSON.parse(message.body)
              setMessages((prevMessages) => [...prevMessages, receivedMessage])
              flatListRef.current?.scrollToEnd({ animated: true })
            })
          },
          onStompError: (frame) => {
            console.error('STOMP error:', frame)
            setIsConnected(false)
          },
        })

        stompClient.current = client
        stompClient.current.activate()
      } catch (error) {
        console.error('Error connecting to STOMP:', error)
      }
    }

    connectStomp()

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate(() => {
          console.log('STOMP disconnected')
        })
      }
    }
  }, [roomId])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y
    if (scrollY <= 0 && hasNext && !loading) {
      loadChatHistory(nextCursor)
    }
  }

  const sendMessage = () => {
    if (stompClient.current && message.trim() && isConnected) {
      const messageObj = {
        message: message,
      }
      stompClient.current.publish({
        destination: `/app/chat-rooms/${roomId}/send`,
        body: JSON.stringify(messageObj),
      })
      setMessage('')
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    } else {
      console.error(
        'Unable to send message. STOMP client is not connected or message is empty.',
      )
    }
  }

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMyMessage = subId === String(item.senderId)

    const messageText = item.message ? item.message : 'No message content'

    if (isMyMessage) {
      return (
        <View style={styles.myMessageContainer}>
          <Text style={styles.myMessageText}>{messageText}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.otherMessageWrapper}>
          <Image
            source={{ uri: item.senderProfileImage }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.senderName}>{item.senderName}</Text>
            <View style={styles.otherMessageContainer}>
              <Text style={styles.otherMessageText}>{messageText}</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages.length > 0 ? messages : []}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderMessage}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View
        style={[
          styles.inputContainer,
          isKeyboardVisible && styles.inputContainerActive,
        ]}
      >
        <TouchableOpacity>
          <Ionicons name="add-circle" size={36} color="green" />
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="메시지를 입력하세요"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatRoomDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  myMessageText: {
    fontSize: 16,
    color: '#000',
  },
  otherMessageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  otherMessageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    maxWidth: '100%',
  },
  senderName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  otherMessageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  inputContainerActive: {
    marginBottom: 0,
  },
})
