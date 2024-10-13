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
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '@/constants/colors'
import { useRef } from 'react'
import { CityData } from '@/types/CityDataType'
import { getCities } from '@/api/Schedule/getCitiesApi'
import { PostTravelScheduleType } from '@/types/PostTravelSchedule'

interface Spotprop {
  startDate: string
  endDate: string
}
export default function ScheduleSpot({ startDate, endDate }: Spotprop) {
  console.log(startDate, endDate, '시작일자 끝일자')
  const navigation = useNavigation()
  //텍스트 인풋에서 받을 검색어
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  //submit 상태에 따라 화면에 조건부 렌더링
  const [submit, setSubmit] = useState<boolean>(false)

  const [mapReady, setMapReady] = useState<boolean>(false)

  const [regions, setRegions] = useState<CityData[]>([])

  const [data, setData] = useState<PostTravelScheduleType>({
    city: '',
    startDate: startDate,
    endDate: endDate,
  })
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

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // 도시 데이터 가져오기
        const cities = await getCities()
        setRegions(cities.data || [])
        console.log('장소데이터', cities)
      } catch (error) {
        console.error('Error fetching hospital data:', error)
      }
    }

    fetchCities()
  }, [])
  //유저의 입력에 따라 받아온 지역 데이터를 필터링하도록
  const filteredRegions = regions.filter((region) =>
    region.region.includes(searchInputValue),
  )

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
      {/* { //지역api를 제출한 경우에 장소추가로 렌더링이 되기 때문
        <View style={styles.nextContainer}>
          <Text style={text.chosenText}>선택한 지역:</Text>
          <View style={styles.regionContainer}>
            <Text style={text.regionText}>오사카</Text>
          </View>
        </View>
      } */}
      {/*여행 일정 컴포넌트*/}
      <ScrollView
        style={
          submit ? styles.nextSchedulesContainer : styles.schedulesContainer
        }
      >
        {filteredRegions.length > 0 &&
          filteredRegions.map((region, index) => (
            <View key={index}>
              <ScheduleSpotComponent
                title={region.region}
                data={data}
                setData={setData}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  )
}
