import { TouchableOpacity, View, Image, Text } from 'react-native'
import { styles, text } from './scheduleSpotStyles'
import ScheduleSpotType from '@/types/ScheduleSpotType'
import { useNavigation } from '@react-navigation/native'

export default function ScheduleSpotComponent({
  imageUrl,
  title,
  hashtag,
  buttonName,
}: ScheduleSpotType) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* 이미지 */}
      <View style={styles.pictureContainer}>
        <Image
          style={styles.picture}
          source={require('@/assets/schedule/japan.png')}
        />
      </View>
      {/*api 연결시 {{uri : string}} */}
      {/* 중간에 보일 컨테이너 장소 도시, 해시태그*/}
      <View style={styles.middleContainer}>
        <View style={styles.spotContainer}>
          <Text style={text.titleText}>{title}</Text>
        </View>
        <View>
          <Text style={text.hashtagText}>{hashtag}</Text>
        </View>
      </View>
      {/*가장 오른쪽에 보여질 장소 추가 컨테이너 */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('SchedulePlaceSearch' as never)
          }}
        >
          <Image
            source={require('@/assets/schedule/bookmark.png')}
            style={styles.bookmarkIcon}
          />
          <Text style={text.buttonText}>{buttonName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
