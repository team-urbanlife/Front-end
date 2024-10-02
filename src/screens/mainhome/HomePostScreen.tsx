import { View, Image, Text } from 'react-native'
import { styles, text } from './Styles/HomePostStyle'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BackButtonHeader from '@/components/Common/backbuttonHeader'

export default function HomePostComponent(post: HomePostType) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <BackButtonHeader />
      <ScrollView>
        <View>
          <View>
            {/*프로필 이미지 */}
            <Image />
            {/*작성자와 작성시간 */}
            <View>
              <Text></Text>
              <Text></Text>
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
    </View>
  )
}
