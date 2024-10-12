import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons' // 아이콘 가져오기
import RecentGatherings from '@/screens/gathering/GatheringHomeScreen'
import ScheduleHome from '@/screens/schedule/ScheduleHomeScreen'
import MypageGatherings from './MypagePostedScreen'
import MySchedules from './MypageScheduledScree'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchUserInfo } from './mypageHttp'

const Tab = createMaterialTopTabNavigator()

interface userInfo {
  userId: number
  username: string
  userProfileImage: string
}

const MyPageScreen = () => {
  const [userInfo, setUserInfo] = useState<userInfo | null>(null) // 유저 정보 상태 추가

  useEffect(() => {
    // 비동기 함수로 유저 정보 가져오기
    const getUserInfo = async () => {
      try {
        //const storedUserInfo = await AsyncStorage.getItem('userInfo')
        const userInfo = await fetchUserInfo()
        console.log('userInfo확인', userInfo)
        if (userInfo) {
          setUserInfo(userInfo) // JSON 파싱 후 상태에 저장
        }
      } catch (error) {
        console.error('Failed to load user info:', error)
      }
    }

    getUserInfo()
  }, [])

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My</Text>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => console.log('설정 버튼 클릭')}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 프로필 영역 */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: userInfo?.userProfileImage, // 프로필 이미지 URL
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userInfo?.username}</Text>
      </View>

      {/* 탭 네비게이션 */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <View style={styles.tabRadiusContainer}>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#FF7F50', // 선택된 탭 색상
                tabBarInactiveTintColor: '#999', // 선택되지 않은 탭 색상
                tabBarIndicatorStyle: { backgroundColor: '#FF7F50' }, // 탭 하단 바 색상
                tabBarStyle: {
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  overflow: 'hidden', // 둥근 테두리가 잘리도록 처리
                },
              }}
            >
              <Tab.Screen name="찜목록" component={ScheduleHome} />
              <Tab.Screen name="작성한 글" component={MypageGatherings} />
              <Tab.Screen name="일정 리스트" component={MySchedules} />
            </Tab.Navigator>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#FF7F50',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    right: 20,
    top: 65,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF7F50',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  tabWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabRadiusContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
})

export default MyPageScreen
