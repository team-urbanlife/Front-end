import { View, Image, Text } from 'react-native'
import { styles, text } from './Styles/HomePostStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import { useState } from 'react'
import { HomePostDetailType } from '@/types/HomePostDetailType'

interface Postprop {
  postId: number
}

export default function HomePostScreen({ postId }: Postprop) {
  const navigation = useNavigation()

  const [post, setPost] = useState<HomePostDetailType>({
    id: 1,
    title: '재미있었던 오사카 여행 후기(어쩌구저쩌구이러쿵저러쿵)',
    name: '지원',
    profileImage: 'https://example.com/profiles/alice.jpg',
    picture: 'https://example.com/posts/post1.jpg',
    contents: [
      {
        type: 'T',
        text: '이번에 오사카 여행에서 정말 재미있는 경험을 했어요. 첫째 날에는 도톤보리에서 맛있는 음식을 먹었어요.',
      },
      { type: 'IMAGE', text: 'https://example.com/posts/post1_day1.jpg' },
      {
        type: 'T',
        text: '둘째 날에는 유니버설 스튜디오 재팬에 갔어요. 사진도 많이 찍었답니다!',
      },
    ],
  })
  return (
    <View style={styles.container}>
      <BackButtonHeader />
      {post && (
        <ScrollView>
          <View>
            <View>
              {/*프로필 이미지 */}
              <Image style={styles.profileImage} />
              {/*작성자와 작성시간 */}
              <View>
                <Text style={text.nameText}>{post.name}</Text>
                <Text style={text.createdAtText}>{post.title}</Text>
              </View>
            </View>
          </View>
          <Text></Text>
          <Image source={{ uri: post.picture }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={text.nameText}>{post.name}</Text>
            <Text style={text.titleText}>{post.title}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
