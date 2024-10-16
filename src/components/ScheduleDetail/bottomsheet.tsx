import React, { useRef, Dispatch, SetStateAction, useState } from 'react'
import {
  View,
  Animated,
  PanResponder,
  Text,
  Image,
  Dimensions,
} from 'react-native'
import { styles, text } from './styles/bottomSheetStyle'
import { DetailedPlan, PlanData } from '@/types/SchedulePlanType'
import ScheduleDetailComponent from './ScheduleDetailComponent'
import {
  PanGestureHandler,
  GestureHandlerStateChangeEvent,
  State,
  ScrollView,
} from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import ScheduleDetailEditComponent from './ScheduleDetailEditComponent'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { useSchedule } from '@/context/ScheduleProvide'
import { patchChangeSchedule } from '@/api/Schedule/patchChangeScheduleApi'
interface BottomSheetProps {
  setBottomSheet: Dispatch<SetStateAction<boolean>>
  setShouldRerender: Dispatch<SetStateAction<boolean>>
  plans: PlanData[]
}

export default function BottomSheet({
  setBottomSheet,
  plans,
  setShouldRerender,
}: BottomSheetProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  //터치 이벤트를 두번 줘야해서 전역으로 관리
  const { scheduleId } = useSchedule()

  const innerGestureHandlerRef = useRef<TouchableOpacity | null>(null)

  const [edit, setEdit] = useState<boolean>(false)
  //높이를 auto로 설정해도 높이가 동적으로 바뀌지 않아서 자식 컴포넌트에 props로 내려서 해당 자식 컴포넌트 길이 가져오게
  const [termsHeight, setTermsHeight] = useState<number>(500)
  // 폰 스크린 높이
  const screenHeight = Dimensions.get('window').height

  // 현재 해당 컴포넌트의 y축 위치
  const translateY = useRef(new Animated.Value(508)).current
  //스크롤해서 내려간 마지막 위치 기억
  const lastY = useRef<number>(0)

  //세부 일정 배열의 길이 만큼의 배열 특정 일자 클릭시에 계획 등장
  const [isClicked, setIsClicked] = useState<boolean[]>(
    new Array(plans.length).fill(false),
  )

  // 팬 리스폰더 설정
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //터치 시작시 응답할지 결정
      onPanResponderGrant: () => {
        translateY.setOffset(lastY.current) // 드래그 시작 시 현재 위치를 기준으로 설정
        translateY.setValue(0) // 현재 이동 값 초기화
      }, //사용자가 요소 드래그 시작할 때 설정
      onPanResponderMove: Animated.event([null, { dy: translateY }], {
        useNativeDriver: false,
      }), //드래그할 때마다
      onPanResponderRelease: (_, gestureState) => {
        const minDragVelocity = 0.98

        if (gestureState.vy > minDragVelocity) {
          //빠르게 스와이프하는 경우
          setBottomSheet(false) // 바텀 시트 상태 업데이트
          // 바텀 시트를 드래그해서 닫을 때 부모 컴포넌트에서 뒷배경 어둡게 해놓은 것도 변화가 가도록
          Animated.spring(translateY, {
            toValue: screenHeight,
            useNativeDriver: true,
          }).start()
        } else if (gestureState.dy < 0 || gestureState.dy > 0) {
          //스크롤 하는 경우
          translateY.flattenOffset() // offset과 현재 값을 합쳐서 새로운 절대 위치 설정
          const listenerId = translateY.addListener(({ value }) => {
            lastY.current = value // 현재 값을 lastY.current에 업데이트
          })

          Animated.spring(translateY, {
            toValue: lastY.current + gestureState.dy, //마지막 수지 위치에 드래그한 길이만큼 더해서 이동
            friction: 7,
            useNativeDriver: true,
          }).start(() => {
            translateY.removeListener(listenerId)
          })
        } else {
          //바텀시트 터치 이벤트가 내부 터치 이벤트와 겹쳐서 제거
        }
      },
    }),
  ).current
  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }], // translationY를 translateY 애니메이션 값에 바인딩
    { useNativeDriver: true }, // 성능 향상을 위해 useNativeDriver 사용
  )

  const handleStateChange = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      // 제스처가 끝났을 때 실행할 동작
    }
  }

  const [data, setData] = useState<DetailedPlan[]>([])
  const [planId, setPlanId] = useState<number>(0)
  // 드래그 후 API 요청을 보내는 함수
  const handleDragEnd = async (newData: DetailedPlan[]) => {
    // 드래그 후 data 배열에서 detailedPlanId와 sequence 값을 추출하여 API 데이터 구조로 변환
    const apiData = newData.map((item, index) => ({
      detailedPlanId: item.detailedPlanId,
      sequence: index + 1, // 배열의 인덱스를 새로운 sequence로 사용
    }))
    console.log('API 요청:', apiData, planId)
    try {
      // 실제 API 요청을 보냄
      if (planId && apiData) {
        await patchChangeSchedule(planId, apiData)
        console.log('API 요청 성공:', apiData)
      }
    } catch (error) {
      console.error('API 요청 실패:', error)
    }
  }

  const { writeDone, setWriteDone } = useSchedule()
  return (
    <PanGestureHandler
      waitFor={[innerGestureHandlerRef]}
      simultaneousHandlers={innerGestureHandlerRef}
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          height: 'auto',
          width: '100%',
          transform: [{ translateY }],
          backgroundColor: '#FFFFFF',
          zIndex: 10,
          borderRadius: 20,
          justifyContent: 'center',
        }}
        {...(edit ? {} : panResponder.panHandlers)}
      >
        {!edit ? (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.setCenter}>
              <View style={styles.topLine} />
            </View>
            {plans &&
              plans.map((plan, index) => {
                const date = plan.travelDate.split('-').slice(1) // 날짜 배열의 월과 일만을 추출
                return (
                  <View key={index} style={styles.container}>
                    <View
                      style={[
                        styles.flexRow,
                        {
                          justifyContent: 'space-between',
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const temp = [...isClicked]
                          temp[index] = !isClicked[index]
                          setIsClicked(temp)
                        }}
                      >
                        <View style={styles.flexRow}>
                          <Text
                            style={text.dayText}
                          >{`Day. ${index + 1}`}</Text>
                          <View style={styles.flexRow}>
                            <Text
                              style={
                                isClicked[index]
                                  ? text.clickText
                                  : text.unclickText
                              }
                            >
                              {date[0] + '/' + date[1]} {/* 월/일 형식으로 */}
                            </Text>
                            <Image
                              source={
                                isClicked[index]
                                  ? require('@/assets/schedule/clickUnderArrow.png')
                                  : require('@/assets/schedule/underArrow.png')
                              }
                              style={styles.arrowIcon}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* 특정 plan의 id가 0일 때(최상단인 경우에) 편집 표시 */}
                      {plan && index === 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            //편집 버튼을 누른 경우에 드래그 앤 드랍이 활성화됨
                            setEdit(!edit)
                          }}
                        >
                          <Text style={text.editText}>편집</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {isClicked[index] &&
                      plan.detailedPlans &&
                      plan.detailedPlans.map((schedule, scheduleIndex) => (
                        <ScheduleDetailComponent
                          key={scheduleIndex}
                          data={schedule}
                          ref={innerGestureHandlerRef}
                          setShouldRerender={setShouldRerender}
                        />
                      ))}
                    {isClicked[index] && (
                      <View style={styles.setCenter}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('SchedulePlaceSearch', {
                              detailedId: plan.scheduleDetailsId,
                              date: plan.travelDate,
                            })
                          }}
                          style={styles.buttonContainer}
                        >
                          <Text style={text.buttonText}>
                            장소 새로 추가하기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )
              })}
            <View style={styles.setCenter}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('WeGoTooOverview')
                }}
                style={styles.naviateContainer}
              >
                <Text style={text.navigateText}>일정 완료</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, height: 'auto' }}>
            <View style={styles.setCenter}>
              <View style={styles.topLine} />
            </View>
            {plans &&
              plans.map((plan, index) => {
                const date = plan.travelDate.split('-').slice(1) // 날짜 배열의 월과 일만을 추출
                return (
                  <View key={index} style={styles.container}>
                    <View
                      style={[
                        styles.flexRow,
                        {
                          justifyContent: 'space-between',
                        },
                      ]}
                    >
                      {/* 날짜 및 클릭 여부 표시 */}
                      <TouchableOpacity
                        onPress={() => {
                          const temp = [...isClicked]
                          temp[index] = !isClicked[index]
                          setIsClicked(temp)
                          console.log(temp)
                          setPlanId(plan.scheduleDetailsId)
                        }}
                      >
                        <View style={styles.flexRow}>
                          <Text
                            style={text.dayText}
                          >{`Day. ${index + 1}`}</Text>
                          <View style={styles.flexRow}>
                            <Text
                              style={
                                isClicked[index]
                                  ? text.clickText
                                  : text.unclickText
                              }
                            >
                              {date[0] + '/' + date[1]} {/* 월/일 형식으로 */}
                            </Text>
                            <Image
                              source={
                                isClicked[index]
                                  ? require('@/assets/schedule/clickUnderArrow.png')
                                  : require('@/assets/schedule/underArrow.png')
                              }
                              style={styles.arrowIcon}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>

                      {/* 특정 plan의 id가 0일 때(최상단인 경우에) 편집 완료 표시 */}
                      {plan && index === 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            setEdit(!edit)
                            const handleDragEnd = async (
                              newData: DetailedPlan[],
                            ) => {
                              // 드래그 후 data 배열에서 detailedPlanId와 sequence 값을 추출하여 API 데이터 구조로 변환
                              const apiData = newData.map((item, index) => ({
                                detailedPlanId: item.detailedPlanId,
                                sequence: index + 1, // 배열의 인덱스를 새로운 sequence로 사용
                              }))
                              console.log('API 요청:', apiData, planId)
                              try {
                                // 실제 API 요청을 보냄
                                if (apiData) {
                                  await patchChangeSchedule(
                                    plan.scheduleDetailsId,
                                    apiData,
                                  )
                                  console.log('API 요청 성공:', apiData)
                                  setShouldRerender(true)
                                }
                              } catch (error) {
                                console.error('API 요청 실패:', error)
                              }
                            }
                            handleDragEnd(data)
                          }}
                          style={{ width: '75%', alignItems: 'flex-end' }}
                        >
                          <Text
                            style={[text.clickText, { marginHorizontal: 5 }]}
                          >
                            편집 완료 하기
                          </Text>
                        </TouchableOpacity>
                      )}
                      {/* 선택된 plan에 대한 ScheduleDetailEditComponent 표시 */}
                    </View>
                    {isClicked[index] && (
                      <View style={{ flexGrow: 1 }}>
                        <ScheduleDetailEditComponent
                          data={plan.detailedPlans}
                          setData={setData}
                        />
                      </View>
                    )}
                  </View>
                )
              })}
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  )
}
