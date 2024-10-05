import { TouchableOpacity, View, Image, Text } from 'react-native'
import { styles, text } from './styles/ScheduleDetailStyle'
import { useNavigation } from '@react-navigation/native'
import { DetailedPlan } from '@/types/SchedulePlanType'
import { TextInput } from 'react-native-gesture-handler'
import { useState, forwardRef } from 'react'

interface ScheduleDetailProps {
  data: DetailedPlan
  isActive?: boolean
}
const ScheduleDetailComponent = forwardRef<
  TouchableOpacity,
  ScheduleDetailProps
>(({ data, isActive }, innerGestureHandlerRef) => {
  const navigation = useNavigation()

  //텍스트 인풋에서 받을 검색어
  const [memoInputValue, setMemoInputValue] = useState<string>('')
  //submit 상태에 따라 화면에 조건부 렌더링
  const [submit, setSubmit] = useState<boolean>(false)

  //검색창 포커스 여부에 따라 placeholder 변화 주기 위해
  const [isFocused, setIsFocused] = useState<boolean>(false)

  //해당 컴포넌트의 클릭 여부는 컴포넌트 내부에서 관리
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleMemo = () => {
    setSubmit(true)
    console.log('Searching for:', memoInputValue)
    setMemoInputValue('')
  }
  //require함수가 반환하는 값이 문자열이 아니라 숫자타입의 리소스id라고함,문자열 배열인줄 알았는데 수정
  const images: Array<number> = [
    require('@/assets/maps/1.png'),
    require('@/assets/maps/2.png'),
    require('@/assets/maps/3.png'),
  ]

  return (
    <TouchableOpacity
      onPress={() => {
        setIsClicked(!isClicked)
      }}
      ref={innerGestureHandlerRef}
    >
      <View
        style={
          isClicked
            ? styles.clickContainer
            : isActive
              ? styles.clickContainer
              : styles.unclickContainer
        }
      >
        {/* 마커 */}
        <View style={styles.pictureContainer}>
          <Image
            style={styles.picture}
            source={images[data.sequence - 1]}
            resizeMode="contain" //이미지 안잘리게
          />
        </View>
        {/* 장소 이름과 메모 */}
        <View style={styles.middleContainer}>
          <View style={styles.spotContainer}>
            <Text style={text.titleText}>{data.region}</Text>
          </View>
          <View>
            <Text style={text.hashtagText}>{data.memo}</Text>
          </View>
        </View>
      </View>
      {/*클릭 시에 보이는 메모를 적는 컨테이너 */}
      {isClicked && (
        <View style={styles.inputPositionContainer}>
          <View style={styles.InputContainer}>
            <TextInput
              value={memoInputValue}
              onChangeText={(text) => {
                setSubmit(false)
                setMemoInputValue(text)
              }}
              placeholder={'이 장소에 대한 메모를 작성해보세요'}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={handleMemo} //완료나 엔터 누른 경우 사용자 입력 처리 이벤트 핸들링
              style={styles.InputStyles}
            />
            <Image
              source={require('@/assets/schedule/pencil.png')}
              style={styles.pencilIcon}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
})

export default ScheduleDetailComponent
