import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const LoginScreen = () => {
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
  const handleKakaoLogin = () => {
    //console.log('카카오 로그인 버튼 클릭됨')
    navigation.navigate('KakaoLoginView')
  }

  return (
    <View style={styles.container}>
      {/* 상단 텍스트 */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          위고투에서
          <Text style={styles.highlight}> 계획하고 함께 떠나는 </Text>
          {'\n'}설렘 가득한 여행을 시작하세요!
        </Text>
      </View>

      {/* 중앙 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/loginMainLogo.png')} // 로고 이미지 경로
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 하단 카카오 로그인 버튼 */}
      <TouchableOpacity
        style={styles.kakaoButtonContainer}
        onPress={handleKakaoLogin}
      >
        <Image
          source={require('@/assets/kakaoLoginMain.png')} // 카카오 로그인 버튼 이미지 경로
          style={styles.kakaoButton}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // 요소들이 위, 가운데, 아래로 나뉘게 배치
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 100, // 상단 텍스트 위치를 아래로 이동
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24, // 글씨 크기 조정
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold', // 글씨 두께 조정
    lineHeight: 32, // 줄 간격 조정
  },
  highlight: {
    color: '#FF6B6B', // 원하는 색상으로 변경
    fontSize: 24, // 글씨 크기 키움
    fontWeight: 'bold', // 글씨 두께 키움
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center', // 로고를 세로로 가운데 배치
    alignItems: 'center', // 가로로 가운데 배치
  },
  logo: {
    width: 300, // 로고 크기
    height: 250, // 로고 크기
  },
  kakaoButtonContainer: {
    width: '85%', // 버튼 너비 설정
    marginBottom: 55, // 버튼을 좀 더 위로 올리기 위해 하단 여백 조정
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  kakaoButton: {
    width: '100%', // 버튼 너비 확장
    height: 100, // 버튼 높이 증가
  },
})

export default LoginScreen
