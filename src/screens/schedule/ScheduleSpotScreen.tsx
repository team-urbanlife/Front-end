import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { styles, text } from './Styles/ScheduleSpotStyles'
import ScheduleSpotComponent from '@/components/ScheduleSpot/scheduleSpotComponent'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '@/constants/colors'
import { useRef } from 'react'
// 더미 데이터
const regions = [
  {
    name: '오사카',
    hashtags: ['#오사카'],
    imageUrl: '',
  },
  {
    name: '뉴욕',
    hashtags: ['#뉴욕', '#빅애플', '#잠들지않는도시'],
    imageUrl: '',
  },
  {
    name: '파리',
    hashtags: ['#파리', '#사랑의도시', '#에펠탑'],
    imageUrl: '',
  },
  {
    name: '도쿄',
    hashtags: ['#도쿄', '#기술', '#스시라이프'],
    imageUrl: '',
  },
  {
    name: '오사카',
    hashtags: ['#오사카'],
    imageUrl: '',
  },
  {
    name: '뉴욕',
    hashtags: ['#뉴욕', '#빅애플', '#잠들지않는도시'],
    imageUrl: '',
  },
  {
    name: '파리',
    hashtags: ['#파리', '#사랑의도시', '#에펠탑'],
    imageUrl: '',
  },
  {
    name: '도쿄',
    hashtags: ['#도쿄', '#기술', '#스시라이프'],
    imageUrl: '',
  },
]

const touristSpots = [
  {
    name: '에펠탑',
    hashtags: ['#에펠탑', '#파리', '#프랑스랜드마크'],
    imageUrl: '',
  },
  {
    name: '자유의 여신상',
    hashtags: ['#자유의여신상', '#뉴욕', '#랜드마크'],
    imageUrl: '',
  },
  {
    name: '후지산',
    hashtags: ['#후지산', '#일본', '#후지산'],
    imageUrl: '',
  },
  {
    name: '버킹엄 궁전',
    hashtags: ['#버킹엄궁전', '#런던', '#왕실가족'],
    imageUrl: '',
  },
  {
    name: '남산타워',
    hashtags: ['#남산타워', '#서울', '#한국'],
    imageUrl: '',
  },
  {
    name: '후지산',
    hashtags: ['#후지산', '#일본', '#후지산'],
    imageUrl: '',
  },
  {
    name: '버킹엄 궁전',
    hashtags: ['#버킹엄궁전', '#런던', '#왕실가족'],
    imageUrl: '',
  },
]

export default function ScheduleSpot() {
  const navigation = useNavigation()
  //텍스트 인풋에서 받을 검색어
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  //submit 상태에 따라 화면에 조건부 렌더링
  const [submit, setSubmit] = useState<boolean>(false)

  const [mapReady, setMapReady] = useState<boolean>(false)

  const handleSearch = () => {
    setSubmit(true)
    console.log('Searching for:', searchInputValue)
  }
  const scrollViewRef = useRef<ScrollView>(null)
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    setScrollPosition(currentOffset)
  }

  const scrollToPosition = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: false })
    }
  }
  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.IconContainer}
        >
          <Image
            style={styles.backIcon}
            source={require('@/assets/back.png')}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchInputValue}
            onChangeText={(text) => {
              setSubmit(false)
              setSearchInputValue(text)
            }}
            placeholder={'검색어를 입력하세요'}
            returnKeyType="search" //키보드 완료 부분이 설정한 문자열로 보이게 설정
            onSubmitEditing={handleSearch} //완료나 엔터 누른 경우 사용자 입력 처리 이벤트 핸들링
            style={styles.InputStyles}
            selectionColor={GlobalStyles.colors.normalDark} //커서 색 변경
          />
          <TouchableOpacity
            style={styles.IconContainer}
            onPress={() => {
              setSubmit(true)
            }}
          >
            <Image
              style={styles.searchIcon}
              source={require('@/assets/schedule/searchButton.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/*장소 선택 화면에서만 */}
      {submit && ( //지역api를 제출한 경우에 장소추가로 렌더링이 되기 때문
        <View style={styles.nextContainer}>
          <Text style={text.chosenText}>선택한 지역:</Text>
          <View style={styles.regionContainer}>
            <Text style={text.regionText}>오사카</Text>
          </View>
        </View>
      )}
      {/*여행 일정 컴포넌트*/}
      <ScrollView
        style={
          submit ? styles.nextSchedulesContainer : styles.schedulesContainer
        }
      >
        {!submit
          ? regions.map((region, index) => (
              <View key={index}>
                <ScheduleSpotComponent
                  title={region.name}
                  hashtag={region.hashtags}
                  buttonName="지역 선택"
                  id={index}
                  imageUrl={region.imageUrl}
                  setSubmit={setSubmit}
                  submit={submit}
                />
              </View>
            ))
          : touristSpots.map((region, index) => (
              <View key={index}>
                <ScheduleSpotComponent
                  title={region.name}
                  hashtag={region.hashtags}
                  buttonName="장소 추가"
                  id={index}
                  imageUrl={region.imageUrl}
                  setSubmit={setSubmit}
                  submit={submit}
                />
              </View>
            ))}
      </ScrollView>
    </View>
  )
}
