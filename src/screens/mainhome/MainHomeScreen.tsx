import LogoHeader from '@/components/Common/logoHeader'
import { View, Text } from 'react-native-reanimated/lib/typescript/Animated'
import { styles, text } from './Styles/MainHomeStyle'

export default function HomeScreen() {
  return (
    <View>
      {/* 헤더  */}
      <LogoHeader />
      <View style={styles.textContainer}>
        <Text style={text.titleText}>나와 맞는 여행지를 찾아보세요!</Text>
        <Text style={text.subtitleText}>
          가장 높은 평가를 받은 맛집들을 알려드립니다.
        </Text>
      </View>
    </View>
  )
}

const homePosts: HomePostType[] = [
  {
    title: 'My First Post',
    id: 1,
    name: 'Alice',
    profileImage: 'https://example.com/profiles/alice.jpg',
    picture: 'https://example.com/posts/post1.jpg',
  },
  {
    title: 'Nature Walk',
    id: 2,
    name: 'Bob',
    profileImage: 'https://example.com/profiles/bob.jpg',
    picture: 'https://example.com/posts/post2.jpg',
  },
  {
    title: 'City Lights',
    id: 3,
    name: 'Charlie',
    profileImage: 'https://example.com/profiles/charlie.jpg',
    picture: 'https://example.com/posts/post3.jpg',
  },
  {
    title: 'Sunset Views',
    id: 4,
    name: 'David',
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
