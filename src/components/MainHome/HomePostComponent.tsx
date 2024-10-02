import { View, Image, Text } from 'react-native'
import { styles, text } from './Styles/HomePostStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function HomePostComponent(post: HomePostType) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        //navigation.navigate('')
      }}
    >
      <Image source={{ uri: post.picture }} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={text.nameText}>{post.name}</Text>
        <Text style={text.titleText}>{post.title}</Text>
      </View>
      <View style={styles.ImageContainer}>
        <Image source={{ uri: post.profileImage }} style={styles.picture} />
      </View>
    </TouchableOpacity>
  )
}
