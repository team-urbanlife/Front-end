import { View, Image, Text } from 'react-native'
import { styles, text } from './Styles/HomePostStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import { useLayoutEffect, useState } from 'react'
import { HomePostDetailType } from '@/types/HomePostDetailType'
import { fetchPostDetail } from './HomePostHttp'

interface Postprop {
  postId: number
}

export default function HomePostScreen({ postId }: Postprop) {
  const navigation = useNavigation()

  const [post, setPost] = useState<HomePostDetailType | null>(null)
  useLayoutEffect(() => {
    async function getPostDetail() {
      try {
        const fetchedPost: HomePostDetailType = await fetchPostDetail(postId)
        setPost(fetchedPost)
      } catch (error) {
        console.log('Error fetching posts:', error)
      }
    }
    getPostDetail()
  }, [])
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
  //const formattedDate = formatDate(post.createdAt)

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
                <Text style={text.nameText}>{post.userName}</Text>
                <Text style={text.createdAtText}>
                  {formatDate(post.registeredDateTime)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={text.titleText}>{post.title}</Text>
          </View>
          {post.contents.map((content, index) => (
            <View key={index}>
              {content.type === 'T' ? (
                <View style={styles.contentContainer}>
                  <Text style={text.contentText}>{content.text}</Text>
                </View>
              ) : (
                <View style={styles.pictureContainer} key={index}>
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
