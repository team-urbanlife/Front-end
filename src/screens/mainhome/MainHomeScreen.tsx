import LogoHeader from '@/components/Common/logoHeader'
import {
  View,
  Text,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { styles, text } from './Styles/MainHomeStyle'
import HomePostComponent from '@/components/MainHome/HomePostComponent'
import { ScrollView } from 'react-native-gesture-handler'
import FloatingButton from '@/components/Common/floatingButton'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useCallback } from 'react'
import { getHomePost } from '@/api/Home/getHomePostApi'
import { GlobalStyles } from '@/constants/colors'
import { useSchedule } from '@/context/ScheduleProvide'

export default function MainHomeScreen() {
  const [posts, setPosts] = useState<HomePostType[]>([])
  const [page, setPage] = useState(1) // 현재 페이지
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터가 있는지 여부
  const { writeDone } = useSchedule()
  // 서버로부터 게시글 목록을 가져오는 함수
  const fetchPosts = async (currentPage: number) => {
    try {
      setIsLoading(true) // 로딩 시작
      const response = await getHomePost(currentPage)
      console.log('메인 홈에서 게시글 목록 조회', response)

      // 페이지네이션이 끝났는지 확인
      if (response.content.length === 0) {
        setHasMore(false)
      } else {
        // 기존 posts에 새로 가져온 게시글을 추가
        setPosts((prevPosts) => [...response.content, ...prevPosts])
      }
    } catch (error) {
      console.log('Error fetching posts:', error)
    } finally {
      setIsLoading(false) // 로딩 종료
    }
  }

  // 화면에 포커스가 맞춰질 때마다 게시글 목록 가져오기
  useFocusEffect(
    useCallback(() => {
      fetchPosts(page)
    }, [page, writeDone]), // 페이지가 바뀔 때마다 실행
  )

  // 스크롤이 끝에 도달했는지 확인하는 함수
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20

    if (isCloseToBottom && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1) // 페이지 번호 증가
    }
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <LogoHeader />
      <View style={styles.textContainer}>
        <Text style={text.titleText}>나와 맞는 여행지를 찾아보세요!</Text>
        <Text style={text.subtitleText}>
          다른 트래블러의 후기를 보고 나도 한번 떠나보자!
        </Text>
      </View>

      {/* 게시글 리스트 */}
      <ScrollView
        style={{ paddingHorizontal: 10, marginBottom: 10 }}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {posts &&
          posts.map((post, index) => (
            <HomePostComponent post={post} key={index.toString()} />
          ))}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.signature}
          />
        )}
      </ScrollView>

      <FloatingButton route="HomePostWriteScreen" />
    </View>
  )
}
