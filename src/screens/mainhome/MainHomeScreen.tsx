import LogoHeader from '@/components/Common/logoHeader'
import { View, Text } from 'react-native'
import { styles, text } from './Styles/MainHomeStyle'
import HomePostComponent from '@/components/MainHome/HomePostComponent'
import { ScrollView } from 'react-native-gesture-handler'
import FloatingButton from '@/components/Common/floatingButton'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useCallback } from 'react'
import { fetchPosts } from './HomePostHttp'

export default function MainHomeScreen() {
  const [posts, setPosts] = useState<HomePostType[] | null>([])

  // 화면에 포커스가 맞춰질 때마다 서버로부터 게시글 목록을 가져오기
  useFocusEffect(
    useCallback(() => {
      async function getPosts() {
        try {
          const fetchedPosts: HomePostType[] = await fetchPosts()
          console.log('메인 홈에서 게시글 목록 조회', fetchedPosts)
          setPosts(fetchedPosts)
        } catch (error) {
          console.log('Error fetching posts:', error)
        }
      }
      getPosts()
    }, []), // 의존성 배열을 비워둬서 매번 실행
  )

  return (
    <View style={styles.container}>
      {/* 헤더  */}
      <LogoHeader />
      <View style={styles.textContainer}>
        <Text style={text.titleText}>나와 맞는 여행지를 찾아보세요!</Text>
        <Text style={text.subtitleText}>
          다른 트래블러의 후기를 보고 나도 한번 떠나보자!
        </Text>
      </View>
      {/*게시글 리스트 */}
      <ScrollView
        style={{ paddingHorizontal: 10, marginBottom: 10, overflow: 'visible' }} //floating Buttton이 안보여서
      >
        {posts?.map((post, index) => (
          <HomePostComponent post={post} key={index.toString()} />
        ))}
      </ScrollView>
      <FloatingButton route="HomePostWriteScreen" />
    </View>
  )
}
