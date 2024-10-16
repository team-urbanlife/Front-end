import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './Styles/schduleCalendarStyles'
import { useState } from 'react'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import CustomCalendar from '@/components/Common/Calendar'
import { PostTravelScheduleType } from '@/types/PostTravelSchedule'
import { postTravelSchedule } from '@/api/Schedule/postTravelScheduleApi'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'

export default function ScheduleCalendar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [bottomsheet, setBottomsheet] = useState<boolean>(false)
  //서버에 여행 일자를 보내기 위한 state
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const handlePostTravelSchedule = async () => {
    const travelSchedule: PostTravelScheduleType = {
      city: '여행 도시',
      startDate: startDate,
      endDate: endDate,
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
      <CustomCalendar
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      />
      <View style={[styles.setCenter, { marginTop: 30 }]}>
        <TouchableOpacity
          onPress={() => {
            if (startDate && endDate) {
              navigation.navigate('SceduleSpot', {
                startDate: startDate,
                endDate: endDate,
              })
            }
          }}
          style={styles.submitContainer}
        >
          <Text style={text.buttonText}>날짜 선택하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
