import { View, Image, Text } from 'react-native'
import { styles, text } from './Styles/HomePostStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import { useLayoutEffect, useState } from 'react'
import { HomePostDetailType } from '@/types/HomePostDetailType'
import { fetchPostDetail } from './HomePostHttp'
import { postLikes } from '@/api/Home/postLikesApi'
interface Postprop {
  postId: number
}

export default function HomePostScreen({ postId }: Postprop) {
  const navigation = useNavigation()

  const [post, setPost] = useState<HomePostDetailType | null>(null)
  //좋아요 리랜더링 용도
  const [liked, setLiked] = useState(false)
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
  }, [liked])
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

  const handlePostLike = async (postId: number) => {
    try {
      const data = await postLikes(postId) // 서버에 좋아요 요청
      if (data.status === 200) {
        // 서버 응답이 성공하면
        setLiked(!liked) // 좋아요 상태 업데이트
        console.log('좋아요 반영됨:', data)
      }
    } catch (error) {
      console.error('좋아요 실패:', error)
    } finally {
      setLiked(!liked)
    }
  }

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
                source={{ uri: post.userProfileImage }}
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
                    source={{ uri: content.text }}
                    style={styles.picture}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.bottomContainer}>
        {post && (
          <View style={styles.flexRow}>
            <View style={styles.Viewcontainer}>
              <Text style={text.contentText}>{'조회수 ' + post.views}</Text>
            </View>
            <View style={styles.Viewcontainer}>
              <Image
                source={require('@/assets/home/like.png')}
                style={styles.likeIcon}
              />
              <Text style={text.contentText}>{post.likeCount}</Text>
            </View>
            {/* {<View>
            <Image />
            <Text>{post.likeCount}</Text> 댓글 기능은 없음 현재 버전에서는
          </View>} */}
          </View>
        )}
        {post && (
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={() => handlePostLike(post.id)}
          >
            <Text style={text.likeText}>공감하기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
