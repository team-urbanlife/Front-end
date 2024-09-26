import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './Styles/ScheduleDetailStyles'
import ScheduleHomeComponent from '@/components/ScheduleHome/scheduleHomeComponent'
import ScheduleDetailType from '@/types/ScheduleDetailType'
import AppleMap from './map'
import BottomSheet from '@/components/ScheduleDetail/bottomsheet'
import { useState } from 'react'
import { PlanData } from '@/types/SchedulePlanType'
import BackButtonHeader from '@/components/Common/backbuttonHeader'

const dummy = [
  {
    id: 0,
    travelDate: '2024-09-01',
    detailedPlans: [
      {
        region: '서울 타워',
        sequence: 1,
        latitude: 37.5512,
        longitude: 126.9882,
        scheduleDetailsId: 101,
        memo: '서울의 유명 관광지',
        memoId: 1001,
      },
      {
        region: '경복궁',
        sequence: 2,
        latitude: 37.5796,
        longitude: 126.977,
        scheduleDetailsId: 102,
        memo: '역사적 궁궐 방문',
        memoId: 1002,
      },
    ],
  },
  {
    id: 1,
    travelDate: '2024-09-02',
    detailedPlans: [
      {
        region: '부산 해운대',
        sequence: 1,
        latitude: 35.1587,
        longitude: 129.1604,
        scheduleDetailsId: 201,
        memo: '바다를 보며 산책',
        memoId: 2001,
      },
      {
        region: '부산 타워',
        sequence: 2,
        latitude: 35.1019,
        longitude: 129.0335,
        scheduleDetailsId: 202,
        memo: '부산 전경 감상',
        memoId: 2002,
      },
    ],
  },
  {
    id: 2,
    travelDate: '2024-09-03',
    detailedPlans: [
      {
        region: '제주 성산일출봉',
        sequence: 1,
        latitude: 33.4587,
        longitude: 126.9426,
        scheduleDetailsId: 301,
        memo: '일출 감상',
        memoId: 3001,
      },
      {
        region: '제주 한라산',
        sequence: 2,
        latitude: 33.3617,
        longitude: 126.5332,
        scheduleDetailsId: 302,
        memo: '등산 계획',
        memoId: 3002,
      },
    ],
  },
]

export default function ScheduleDatail() {
  //const navigation = useNavigation()

  const [plans, setPlans] = useState<PlanData[]>(dummy)
  const [bottomsheet, setBottomsheet] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <BackButtonHeader />
      {/*상단 바 */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 30 }}>
        <Text style={text.titleText}>세부 일정 등록하기</Text>
        <Text style={text.subtitleText}>
          세부 계획을 짜면서 설레는 여행을 준비해봐요!
        </Text>
      </View>
      <AppleMap />
      <BottomSheet setBottomSheet={setBottomsheet} plans={plans} />
    </View>
  )
}
