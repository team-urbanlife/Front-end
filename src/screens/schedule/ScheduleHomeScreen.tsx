import React, { useState, useCallback } from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { styles, text } from './Styles/ScheduleHomeStyles'
import ScheduleHomeComponent from '@/components/ScheduleHome/scheduleHomeComponent'
import { Schedule } from '@/types/ScheduleHomeType'
import FloatingButton from '@/components/Common/floatingButton'
import { getScheduleHome } from '@/api/Schedule/getScheduleHome'
import { GlobalStyles } from '@/constants/colors'
export default function ScheduleHome() {
  const [plans, setPlans] = useState<Schedule[]>([]) // 여행 일정 데이터
  const [page, setPage] = useState(1) // 현재 페이지
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터가 있는지 여부

  const handleSchedule = async (currentPage: number) => {
    try {
      setIsLoading(true) // 로딩 상태 설정
      const response = await getScheduleHome(currentPage, 4) // API 호출 (페이지당 4개씩)

      if (response.data.content.length > 0) {
        setPlans((prevPlans) => [...prevPlans, ...response.data.content]) // 이전 데이터와 병합
      } else {
        setHasMore(false) // 더 이상 불러올 데이터가 없을 때
      }
    } catch (error) {
      console.error('Error Getting travel schedule:', error)
    } finally {
      setIsLoading(false) // 로딩 완료
    }
  }
  // 스크롤이 끝에 도달했는지 확인하는 함수
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    if (isCloseToBottom && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1) // 페이지 번호 증가
    }
  }
  // 페이지가 변경될 때마다 새로운 데이터를 가져오기
  useFocusEffect(
    useCallback(() => {
      handleSchedule(page)
    }, [page]),
  )
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Image style={styles.Logo} source={require('@/assets/logo.png')} />
        <View style={styles.searchNotiContainer}>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('' as never)
            }}
          >
            <Image
              source={require('@/assets/schedule/search.png')}
              style={styles.searchNotiIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('' as never)
            }}
          >
            <Image
              source={require('@/assets/notification.png')}
              style={styles.searchNotiIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* 상단부*/}
      <View style={styles.textContainer}>
        <Text style={text.titleText}>예정된 여행 일정</Text>
        <Text style={text.subtitleText}>
          어떤 여행이 나를 기다리고 있을까요?
        </Text>
      </View>
      {/*여행 일정 컴포넌트 */}
      <ScrollView
        style={styles.schedulesContainer}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {plans &&
          plans.map((schedule, index) => (
            <View key={index}>
              <ScheduleHomeComponent
                startDate={schedule.startDate}
                endDate={schedule.endDate}
                title={schedule.title}
                participants={schedule.participants}
                id={schedule.id}
              />
            </View>
          ))}
        {/* 로딩 중일 때 표시되는 로딩 인디케이터 */}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.signature}
          />
        )}
      </ScrollView>
      <FloatingButton route="SceduleCalendar" />
    </View>
  )
}
