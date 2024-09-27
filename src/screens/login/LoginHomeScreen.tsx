import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { openKakaoLogin } from './loginHttp'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
//const redirect_uri = 'https://0209-211-177-2-61.ngrok-free.app/test2'
//const redirect_uri = 'http://192.168.25.43:3001/redirect'
//const encodedRedirectURI = encodeURIComponent(redirect_uri)

// const KAKAO_LOGIN_URL = `http://dev.wegotoo.net/oauth/login/kakao?redirect_uri=${encodedRedirectURI}`

const KAKAO_LOGOUT_URL = 'https://dev.wegotoo.net/v1/app/logout'
const KAKAO_TOKEN_REFRESH_URL = 'http://dev.wegotoo.net/v1/app/reissue'
const refreshTokenHandler = async () => {
  /* try {
    const refreshToken = await AsyncStorage.getItem('refresh_token') // 저장된 액세스 토큰을 가져옴
    if (true) {
      const response = await fetch(KAKAO_TOKEN_REFRESH_URL, {
        method: 'POST',
        headers: {
          Authorization-refresh: `${refreshToken}`, // 액세스 토큰을 헤더에 포함
        },
      }) 
      

      if (response.ok) {
        // 로그아웃 성공 시 처리
        await AsyncStorage.removeItem('access_token') // 로컬에서 토큰 삭제
        Alert.alert('카카오에서 로그아웃 되었습니다.')
      } else {
        Alert.alert('카카오 로그아웃에 실패했습니다.')
      }
    } else {
      Alert.alert('저장된 토큰이 없습니다.')
    }
  } catch (error) {
    console.error('Error during Kakao logout:', error)
    Alert.alert('카카오 로그아웃 중 오류가 발생했습니다.')
  } */
}
const handleKakaoLogout = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken') // 저장된 액세스 토큰을 가져옴
    console.log(accessToken)
    if (accessToken) {
      /* const response = await axios.get(
        'https://dev.wegotoo.net/v1/app/logout',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
          },
        },
      ) */
      const response = await axios.post(
        'https://dev.wegotoo.net/v1/app/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
          },
        },
      )
      console.log(response)

      // 로그아웃 성공 시 처리
      await AsyncStorage.removeItem('accessToken') // 로컬에서 토큰 삭제
      await AsyncStorage.removeItem('refreshToken') // 로컬에서 토큰 삭제
      Alert.alert('카카오에서 로그아웃 되었습니다.')

      //Alert.alert('카카오 로그아웃에 실패했습니다.')
    } else {
      Alert.alert('저장된 토큰이 없습니다.')
    }
  } catch (error) {
    console.error('Error during Kakao logout:', error)
    Alert.alert('카카오 로그아웃 중 오류가 발생했습니다.')
  }
}

const LoginHomeScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isWebViewVisible, setIsWebViewVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')

  // 네비게이션 스택 타입 정의
  type RootStackParamList = {
    KakaoLoginView: undefined
    // 다른 스크린 타입이 있다면 여기에 추가
  }

  //  네비게이션 타입 정의
  type KakaoLoginViewScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'KakaoLoginView'
  >
  const navigation = useNavigation<KakaoLoginViewScreenNavigationProp>() // navigation 객체 가져오기
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleKakaoLogin = () => {
    //setIsWebViewVisible(true) // 웹뷰 열기
    //openKakaoLogin()
    navigation.navigate('KakaoLoginView')
  }

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.welcomeText}>반갑습니다!</Text>
        <Text style={styles.loginText}>
          <Text style={styles.highlightText}>로그인</Text>을 해주세요.
        </Text>

        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력해주세요"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordToggle}
        >
          <Image
            source={require('@/assets/icon.png')}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>계정이 없으신가요? </Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.socialLoginText}>간편 로그인</Text>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity onPress={handleKakaoLogin}>
            <Image
              source={require('@/assets/kakaoLogo.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('@/assets/naverLogo.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('@/assets/googleLogo.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </>

      {/* <TouchableOpacity onPress={handleKakaoLogout}>
        <Text>카카오 로그아웃</Text>
      </TouchableOpacity> */}

      {/*  <TouchableOpacity onPress={refreshTokenHandler}>
        <Text>토큰 재발급</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    paddingVertical: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 18,
    marginBottom: 20,
  },
  highlightText: {
    color: '#FF6F61',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
  },
  passwordIcon: {
    width: 20,
    height: 20,
  },
  loginButton: {
    backgroundColor: '#FF6F61',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerText: {
    color: '#FF6F61',
  },
  socialLoginText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
})

export default LoginHomeScreen
