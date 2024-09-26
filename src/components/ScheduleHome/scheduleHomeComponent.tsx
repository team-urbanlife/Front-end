import { TouchableOpacity, View, Image, Text } from 'react-native'
import ScheduleDetailType from '../../types/ScheduleDetailType'
import { styles, text } from './scheduleHomeComponentStyles'

export default function ScheduleHomeComponent({
  startTime,
  endTime,
  title,
  totalPeople,
  imageUrl,
}: ScheduleDetailType) {
  return (
    <TouchableOpacity style={styles.container}>
      {/* 이미지 */}
      <Image
        style={styles.picture}
        source={require('../../assets/travel.png')}
      />
      {/*api 연결시 {{uri : string}} */}
      {/* 오른쪽에 보일 컨테이너 */}
      <View style={styles.rightContainer}>
        <View style={styles.scheduleContainer}>
          <Text style={text.scheduleText}>{startTime + '~' + endTime}</Text>
        </View>
        <View>
          <Text style={text.titleText}>{title}</Text>
        </View>
        {/* <View>
          <Text></Text>
        </View> */}
        <View style={styles.bottomContainer}>
          <View style={styles.flexRow}>
            <Text style={text.bottomText}>일정 상세 보기 </Text>
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.IconImage}
            />
          </View>
          <Text style={[text.bottomText, { fontWeight: '800' }]}>
            {totalPeople + '명 참여중'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
