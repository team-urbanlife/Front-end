import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './Styles/schduleCalendarStyles'
import { useState } from 'react'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import CustomCalendar from '@/components/Common/Calendar'
import { useNavigation } from '@react-navigation/native'
import { PostTravelScheduleType } from '@/types/PostTravelSchedule'
import { postTravelSchedule } from '@/api/Schedule/postTravelScheduleApi'

export default function ScheduleCalendar() {
  const navigation = useNavigation()

  const [bottomsheet, setBottomsheet] = useState<boolean>(false)

  const handlePostTravelSchedule = async () => {
    const travelSchedule: PostTravelScheduleType = {
      city: '여행 도시',
      startDate: '2024-09-01',
      endDate: '2024-09-02',
    }
    console.log('여행 계획 데이터:', travelSchedule)
    // 버튼이 눌렸을 때 post 요청
    await postTravelSchedule(travelSchedule)
  }
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <BackButtonHeader />
      {/*상단 바 */}
      <View style={styles.textContainer}>
        <Text style={text.titleText}>여행 일정 등록하기</Text>
        <Text style={text.subtitleText}>
          어떤 여행이 나를 기다리고 있을까요?
        </Text>
      </View>
      <CustomCalendar />
      <View style={[styles.setCenter, { marginTop: 30 }]}>
        <TouchableOpacity
          onPress={() => {
            handlePostTravelSchedule()
            navigation.navigate('SceduleSpot' as never)
          }}
          style={styles.submitContainer}
        >
          <Text style={text.buttonText}>날짜 선택하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
