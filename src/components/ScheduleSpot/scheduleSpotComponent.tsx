import { TouchableOpacity, View, Image, Text } from 'react-native'
import { styles, text } from './scheduleSpotStyles'
import ScheduleSpotType from '../../types/ScheduleSpotType'

export default function ScheduleSpotComponent({
  imageUrl,
  title,
  hashtag,
  buttonName,
}: ScheduleSpotType) {
  return (
    <TouchableOpacity style={styles.container}>
      {/* 이미지 */}
      <Image style={styles.picture} source={require('@/assets/japan.png')} />
      {/*api 연결시 {{uri : string}} */}
      {/* 중간에 보일 컨테이너 장소 도시, 해시태그*/}
      <View style={styles.middleContainer}>
        <View style={styles.scheduleContainer}>
          <Text style={text.scheduleText}>{title}</Text>
        </View>
        <View>
          <Text style={text.titleText}>{hashtag}</Text>
        </View>
      </View>
      {/*가장 오른쪽에 보여질 장소 추가 컨테이너 */}
      <View style={styles.rightContainer}>
        <View style={styles.buttonContainer}>
          <Image
            source={require('@/assets/bookmark.png')}
            style={styles.bookmarkIcon}
          />
          <Text style={text.buttonText}>{buttonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
