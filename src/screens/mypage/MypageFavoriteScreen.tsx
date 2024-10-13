import LogoHeader from '@/components/Common/logoHeader'
import { View, Text } from 'react-native'
import { styles, text } from '@/screens/mainhome/Styles/MainHomeStyle'
import HomePostComponent from '@/components/MainHome/HomePostComponent'
import { ScrollView } from 'react-native-gesture-handler'
import FloatingButton from '@/components/Common/floatingButton'

export default function MyPageFavoriteScreen() {
  return (
    <View style={styles.container}>
      {/* 헤더  */}
      {/* <LogoHeader />
      <View style={styles.textContainer}>
        <Text style={text.titleText}>나와 맞는 여행지를 찾아보세요!</Text>
        <Text style={text.subtitleText}>
          다른 트래블러의 후기를 보고 나도 한번 떠나보자!
        </Text>
      </View> */}
      {/*게시글 리스트 */}
      <ScrollView
        style={{ paddingHorizontal: 10, marginBottom: 10, overflow: 'visible' }} //floating Buttton이 안보여서
      >
        {homePosts.map((post, index) => (
          <HomePostComponent post={post} key={index} />
        ))}
      </ScrollView>
      {/* <FloatingButton route="HomePostWriteScreen" /> */}
    </View>
  )
}

const homePosts: HomePostType[] = [
  {
    title: '재미있었던 오사카 여행 후기(어쩌구저쩌구이러쿵저러쿵)',
    id: 1,
    name: '지원',
    profileImage: 'https://example.com/profiles/alice.jpg',
    picture: 'https://example.com/posts/post1.jpg',
  },
  {
    title: '재미있었던 오사카 여행 후기',
    id: 2,
    name: '예나',
    profileImage: 'https://example.com/profiles/bob.jpg',
    picture: 'https://example.com/posts/post2.jpg',
  },
  {
    title: '재미있었던 오사카 여행 후기',
    id: 3,
    name: '수정',
    profileImage: 'https://example.com/profiles/charlie.jpg',
    picture: 'https://example.com/posts/post3.jpg',
  },
  {
    title: 'Sunset Views',
    id: 4,
    name: '채은',
    profileImage: 'https://example.com/profiles/david.jpg',
    picture: 'https://example.com/posts/post4.jpg',
  },
  {
    title: 'Mountain Adventure',
    id: 5,
    name: 'Eve',
    profileImage: 'https://example.com/profiles/eve.jpg',
    picture: 'https://example.com/posts/post5.jpg',
  },
]
