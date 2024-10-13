import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
} from 'react-native'
import { styles, text } from './Styles/ScheduleDetailStyles'
import AppleMap from './map'
import BottomSheet from '@/components/ScheduleDetail/bottomsheet'
import { useState, useEffect, useCallback } from 'react'
import { PlanData } from '@/types/SchedulePlanType'
import BackButtonHeader from '@/components/Common/backbuttonHeader'
import { getDetailedPlans } from '@/api/Schedule/getDetailedPlansApi'
import { useFocusEffect } from '@react-navigation/native'
import { useSchedule } from '@/context/ScheduleProvide'
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

export default function ScheduleDetail() {
  const { scheduleId = 0 } = useSchedule()
  //메모 작성 이후 ui 반영이 바로 안됨
  const [shouldRerender, setShouldRerender] = useState(false)
  console.log('스케줄 아이디 상세페이지에서 어떻게 받아와지나', scheduleId)
  const [bottomsheet, setBottomsheet] = useState<boolean>(true)
  const [planLength, setPlanLength] = useState<number>(0)
  const handleOutsideClick = () => {
    if (!bottomsheet) {
      setBottomsheet(true)
    }
  }
  const [plans, setPlans] = useState<PlanData[]>([])
  const handleDetailedSchedule = async () => {
    if (!scheduleId) return // scheduleId가 없으면 함수 종료
    try {
      const response = await getDetailedPlans(scheduleId)
      setPlans(response.data) // 상태 업데이트
      setPlanLength(response.data.length) // 배열 길이 저장
      console.log(response.data, '받아온 plans')
    } catch (error) {
      console.error('Error Getting travel schedule:', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (scheduleId) {
        handleDetailedSchedule()
        shouldRerender && setShouldRerender(!shouldRerender)
      }
    }, [scheduleId, shouldRerender]),
  )

  //plans를 넣으면 plans가 배열이어서 같은 배열임에도 불구하고 계속 state가 변했다고 생각함 그래서 서버에 호출을 계속 보냄
  //그래서 배열의 길이 변화를 통해서 호출을 보내려고 했음 그런데 state안에 빈배열이 들어가기 전에 length가 할당이 되면 null에는 length속성이 없다고 에러가 남
  //planLength를 의존성 배열에 넣기에는 planLength의 set함수가 호출 handling 함수 안에 들어있어서 또 변화를 감지하지 못하고 결국 plan state의 변화를
  //알아차려야 하는데 그게 어떻게 가능할 수 있을까?

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
      <Pressable style={{ flex: 1 }} onPress={handleOutsideClick}>
        {/*이렇게 하지 말고 map에서 plans를 호출해도 되자나 이걸 내려줄 생각을 하지 말고 */}
        {/* {plans && plans[plans.length - 1].detailedPlans ? (
          <AppleMap
            latitude={plans[plans.length - 1].detailedPlans[0].latitude}
            longitude={plans[plans.length - 1].detailedPlans[0].longitude}
            plans={plans[plans.length - 1].detailedPlans}
          />
        ) : ( */}
        {/* // plans나 detailedPlans가 비어 있을 경우 기본값 사용 */}
        {plans && <AppleMap plans={plans} />}
        {/* )} */}
      </Pressable>
      {bottomsheet && plans && scheduleId && (
        <BottomSheet
          setBottomSheet={setBottomsheet}
          plans={plans}
          setShouldRerender={setShouldRerender}
        />
      )}
    </View>
  )
}
