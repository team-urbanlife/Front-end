import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import {
  styles,
  text,
} from '@/components/ScheduleHome/scheduleHomeComponentStyles'
//import ScheduleHomeComponent from '@/components/ScheduleHome/scheduleHomeComponent'
import ScheduleDetailType from '@/types/ScheduleDetailType'
import FloatingButton from '@/components/Common/floatingButton'
import { StyleSheet } from 'react-native'
import { fetchMySchedules } from './mypageHttp'
import { useLayoutEffect, useState } from 'react'

// ScheduleDetail 객체 배열 예시

interface ScheduleType {
  id: number // 고유 ID
  title: string // 일정 제목
  startDate: string // 시작 시간
  endDate: string // 종료 시간
  participants: string // 장소 (optional)
  imageUrl?: string
}
function ScheduleHomeComponent({
  startDate,
  endDate,
  title,
  participants,
  imageUrl,
}: ScheduleType) {
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

export default function MySchedules() {
  const [myschedules, setMyschedules] = useState<ScheduleType[]>([]) // Gathering 배열로 타입 지정
  //const schedules: ScheduleType[] = fetchMySchedules()
  // useLayoutEffect로 데이터 fetch
  useLayoutEffect(() => {
    async function getMySchedules() {
      try {
        const schedules: ScheduleType[] = await fetchMySchedules() // Gathering 배열 타입
        setMyschedules(schedules)
      } catch (error) {
        //setError('Could not fetch gatherings!')
      }
      //setIsFetching(false)
    }
    getMySchedules()
  }, [])
  return (
    <View style={styles2.container}>
      {/*여행 일정 컴포넌트 */}
      <ScrollView style={styles2.schedulesContainer} bounces={false}>
        {myschedules &&
          myschedules.map((schedule, index) => (
            <View key={index}>
              <ScheduleHomeComponent
                startDate={schedule.startDate}
                endDate={schedule.endDate}
                title={schedule.title}
                imageUrl={schedule.imageUrl}
                participants={schedule.participants}
                id={schedule.id}
                //createdAt={schedule.createdAt}
              />
            </View>
          ))}
      </ScrollView>
      {/*  <FloatingButton route="SceduleSpot" /> */}
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1, // 부모 View가 화면 전체를 차지하도록 설정
    backgroundColor: '#fff',
  },
  schedulesContainer: {
    flex: 1, // 스크롤 뷰가 남은 화면 공간을 모두 차지하도록 설정
    marginTop: 10, // 필요에 따라 탭바와의 간격을 조정
  },
})
