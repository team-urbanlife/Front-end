import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './Styles/schduleCalendarStyles'
import { useState } from 'react'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import CustomCalendar from '@/components/Common/Calendar'

export default function ScheduleCalendar() {
  //const navigation = useNavigation()

  const [bottomsheet, setBottomsheet] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <BackButtonHeader />
      {/*상단 바 */}
      <View>
        <Text>여행 일정 등록하기</Text>
        <Text>어떤 여행이 나를 기다리고 있을까요?</Text>
      </View>
      <CustomCalendar />
      <View>
        <View>
          <Text>날짜 선택하기</Text>
        </View>
      </View>
    </View>
  )
}
