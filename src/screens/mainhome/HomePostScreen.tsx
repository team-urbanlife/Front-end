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
      { type: 'IMAGE', text: '@/assets/travel.png' },
      {
        type: 'T',
        text: '둘째 날에는 유니버설 스튜디오 재팬에 갔어요. 사진도 많이 찍었답니다!',
      },
    ],
    createdAt: '2024-10-05T12:00:00Z',
  })
  //날짜를 변환하는 함수
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString)
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // 변환 일자
  const formattedDate = formatDate(post.createdAt)

  return (
    <View style={styles.container}>
      <BackButtonHeader />
      {post && (
        <ScrollView>
          <View>
            <View style={styles.WritterContainer}>
              {/*프로필 이미지 */}
              <Image
                style={styles.profileImage}
                source={require('@/assets/travel.png')}
              />
              {/*작성자와 작성시간 */}
              <View style={styles.textContainer}>
                <Text style={text.nameText}>{post.name}</Text>
                <Text style={text.createdAtText}>{formattedDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={text.titleText}>{post.title}</Text>
          </View>
          {post.contents.map((content, index) => (
            <View>
              {content.type === 'T' ? (
                <View style={styles.contentContainer} key={index}>
                  <Text style={text.contentText}>{content.text}</Text>
                </View>
              ) : (
                <View style={styles.pictureContainer}>
                  <Image
                    source={require('@/assets/food.png')}
                    style={styles.picture}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}
