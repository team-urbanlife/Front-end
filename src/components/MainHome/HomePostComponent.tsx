import { View, Image, Text } from 'react-native'
import { styles, text } from './Styles/HomePostStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
interface prop {
  post: HomePostType
}

interface HomePostProp {
  postId: number
}
export default function HomePostComponent({ post }: prop) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('HomePostScreen', { postId: post.postId })
      }}
    >
      <Image source={{ uri: post.thumbnail }} style={styles.picture} />
      {/*{ uri: post.picture } */}
      <View style={styles.textContainer}>
        <Text style={text.nameText}>{post && post.userName}</Text>
        <Text style={text.titleText}>
          {post.title.length > 23
            ? post.title.substring(0, 23) + '...'
            : post.title}
        </Text>
        <Text style={text.contentText}>
          {post.content.length > 23
            ? post.content.substring(0, 23) + '...'
            : post.content}
        </Text>
      </View>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: post.userProfileImage }}
          style={styles.profileImage}
        />
      </View>
    </TouchableOpacity>
  )
}
