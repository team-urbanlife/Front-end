/* import React, { useEffect } from 'react'
import { Linking, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event

      // 딥 링크에서 토큰 추출
      const token = getTokenFromURL(url)
      if (token) {
        AsyncStorage.setItem('access_token', token) // 토큰 저장
        console.log('토큰 저장 완료:', token)
      }
    }

    // 딥 링크 이벤트 리스너 등록
    Linking.addEventListener('url', handleDeepLink)

    return () => {
      Linking.removeEventListener('url', handleDeepLink)
    }
  }, [])

  const getTokenFromURL = (url) => {
    const params = new URLSearchParams(url.split('?')[1])
    return params.get('token') // 토큰 추출
  }

  return (
    <View>
      <Text>카카오 로그인 중...</Text>
    </View>
  )
}

export default LoginScreen
 */
