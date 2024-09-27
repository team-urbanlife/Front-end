import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
//import Cookies from '@react-native-cookies/cookies'
import * as WebBrowser from 'expo-web-browser'
import { openKakaoLogin } from './loginHttp'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

function KakaoLoginView() {
  // 네비게이션 스택 타입 정의
  type RootStackParamList = {
    WeGoTooOverview: undefined
    // 다른 스크린 타입이 있다면 여기에 추가
  }

  // WeGoTooOverview의 네비게이션 타입 정의
  type WegoTooOverViewScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'WeGoTooOverview'
  >
  const navigation = useNavigation<WegoTooOverViewScreenNavigationProp>()

  // 토큰 저장 함수
  const saveTokenToStorage = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken)
      await AsyncStorage.setItem('refreshToken', refreshToken)
      console.log('액세스 토큰 저장 성공:', accessToken)
      console.log('리프레쉬 토큰 저장 성공:', refreshToken)
    } catch (error) {
      console.log('토큰 저장 실패:', error)
      Alert.alert('에러', '토큰 저장 중 문제가 발생했습니다.')
    }
  }
  //openKakaoLogin()
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
