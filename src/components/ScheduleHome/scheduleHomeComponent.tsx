import { TouchableOpacity, View, Image, Text } from 'react-native'
import ScheduleDetailType from '@/types/ScheduleDetailType'
import { styles, text } from './scheduleHomeComponentStyles'
import { Schedule } from '@/types/ScheduleHomeType'
import { useNavigation } from '@react-navigation/native'
import { useSchedule } from '@/context/ScheduleProvide'

const Images = [
  require('@/assets/trveldummy/1.png'),
  require('@/assets/trveldummy/2.png'),
  require('@/assets/trveldummy/3.png'),
  require('@/assets/trveldummy/4.png'),
  require('@/assets/trveldummy/5.png'),
  require('@/assets/trveldummy/6.png'),
  require('@/assets/trveldummy/7.png'),
  require('@/assets/trveldummy/8.png'),
  require('@/assets/trveldummy/9.png'),
  require('@/assets/trveldummy/10.png'),
  require('@/assets/trveldummy/11.png'),
  require('@/assets/trveldummy/12.png'),
]

export default function ScheduleHomeComponent({
  id,
  title,
  startDate, // ISO 날짜 형식 (YYYY-MM-DD)
  endDate, // ISO 날짜 형식 (YYYY-MM-DD)
  participants,
}: Schedule) {
  const navigation = useNavigation()

  const { setScheduleId } = useSchedule()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setScheduleId(id)
        navigation.navigate('SceduleDetail' as never)
      }}
    >
      {/* 이미지 */}
      <Image style={styles.picture} source={Images[id % Images.length]} />
      {/*api 연결시 {{uri : string}} */}
      {/* 오른쪽에 보일 컨테이너 */}
      <View style={styles.rightContainer}>
        <View style={styles.scheduleContainer}>
          <Text style={text.scheduleText}>{startDate + '~' + endDate}</Text>
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
            {participants + '명 참여중'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
