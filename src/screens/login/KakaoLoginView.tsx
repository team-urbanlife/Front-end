import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import EventSource from 'react-native-event-source'
import { useChat } from '@/context/chat-context'
import { fetchUserInfo } from '../mypage/mypageHttp'

// 네비게이션 스택 타입 정의
type RootStackParamList = {
  WeGoTooOverview: undefined
}

type WegoTooOverViewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WeGoTooOverview'
>

const KakaoLoginView: React.FC = () => {
  const navigation = useNavigation<WegoTooOverViewScreenNavigationProp>()
  const { setChatRooms } = useChat() // 전역 상태의 setChatRooms 사용
  const [isSubscribed, setIsSubscribed] = useState(false) // SSE 구독 상태 추가
  const [error, setError] = useState<string | null>(null) // 에러 상태 추가

  // 토큰 저장 함수
  const saveTokenToStorage = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    try {
      /* accessToken =
        'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJzbmFrNTI0MEBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImV4cCI6MTAxNzI3OTY1MDQzfQ.xhsc7qPSFJGAyklI_HA61WYbl6GGBCf7Jk-j3HLKf9MXFsOKg7tb1KSJ5Dtw_lG9' */
      await AsyncStorage.setItem('accessToken', accessToken)
      await AsyncStorage.setItem('refreshToken', refreshToken)

      const secondItem = atob(accessToken.split('.')[1])
      const subId = JSON.parse(secondItem).sub
      console.log('subId값 확인', subId)
      await AsyncStorage.setItem('subId', subId)
      // 유저정보 저장
      /* const userInfo = await fetchUserInfo()
      await AsyncStorage.setItem('userInfo', userInfo) */

      console.log('액세스 토큰 저장 성공:', accessToken)
      console.log('리프레쉬 토큰 저장 성공:', refreshToken)
    } catch (error) {
      console.log('토큰 저장 실패:', error)
      Alert.alert('에러', '토큰 저장 중 문제가 발생했습니다.')
    }
  }

  // SSE 구독 함수
  const fetchTokenAndConnectSSE = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    if (!token) {
      setError('Token not found.')
      return
    }

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

          setChatRooms((prevChatRooms: any[]) => {
            const chatRoomIndex = prevChatRooms.findIndex(
              (room) => room.chatRoomId === parsedData.chatRoomId,
            )

            if (chatRoomIndex === -1) return prevChatRooms

            const updatedChatRoom = {
              ...prevChatRooms[chatRoomIndex],
              lastMessage:
                parsedData.message || prevChatRooms[chatRoomIndex].lastMessage,
              unreadCount: prevChatRooms[chatRoomIndex].unreadCount + 1,
              lastMessageCreateAt: new Date().toISOString(),
            }

            const updatedChatRooms = [...prevChatRooms]
            updatedChatRooms[chatRoomIndex] = updatedChatRoom
            console.log(
              '이벤트 데이터로 잘 업데이트 되는지 확인',
              updatedChatRooms,
            )
            return updatedChatRooms
          })
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

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: 'https://web-wegotoo.vercel.app/app/oauth/kakao?redirect_uri=https://web-wegotoo.vercel.app/app/oauth/callback',
        }}
        javaScriptEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        originWhitelist={['http://*', 'https://*']}
        cacheEnabled={false}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url !== 'about:blank') {
            return true
          }
          return false
        }}
        onNavigationStateChange={async (navState) => {
          console.log('현재 URL:', navState.url)
          if (navState.url.includes('access_token=')) {
            const target = navState.url
            const exp1 = 'access_token='
            const exp2 = 'refresh_token='
            const condition1 = target.indexOf(exp1)
            const condition2 = target.indexOf(exp2)
            if (condition1 !== -1 && condition2 !== -1) {
              const accessTokenValue = target.substring(
                condition1 + exp1.length,
                condition2 - 1,
              )
              const refreshTokenValue = target.substring(
                condition2 + exp2.length,
              )
              console.log('access_token값 :: ', accessTokenValue)

              // token을 저장하는 로직 작성
              await saveTokenToStorage(accessTokenValue, refreshTokenValue)

              // SSE 구독 시작
              if (!isSubscribed) {
                await fetchTokenAndConnectSSE()
                setIsSubscribed(true) // 구독 상태 설정
              }

              navigation.navigate('WeGoTooOverview')
            }
          }
        }}
      />
    </View>
  )
}

export default KakaoLoginView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
