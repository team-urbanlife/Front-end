import { TouchableOpacity, View, Image, Text } from 'react-native'
import { styles, text } from './scheduleSpotStyles'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { PostTravelScheduleType } from '@/types/PostTravelSchedule'
import { postTravelSchedule } from '@/api/Schedule/postTravelScheduleApi'
import { useEffect, useState, useRef } from 'react'
import { RootStackParamList } from '../../../App'
import { useSchedule } from '@/context/ScheduleProvide'
interface SpotComponentProp {
  data: PostTravelScheduleType
  title: string
  setData: React.Dispatch<React.SetStateAction<PostTravelScheduleType>>
}
export default function ScheduleSpotComponent({
  data,
  title,
  setData,
}: SpotComponentProp) {
  const navigation = useNavigation()
  //전역 데이터로 받아온 스케줄 아이디
  const { setScheduleId, scheduleId, writeDone, setWriteDone } = useSchedule()
  //서버에 호출이 너무 많아서 post state로 관리
  const [hasPosted, setHasPosted] = useState<boolean>(false)
  const handlePostTravelSchedule = async (newCity: string) => {
    try {
      const response = await postTravelSchedule({
        ...data,
        city: newCity,
      })
      setScheduleId(response.data.scheduleId)
      setWriteDone(!writeDone)
      console.log('여행 post하고 받아온 id:', scheduleId)
      setHasPosted(true)
    } catch (error) {
      console.error('Error posting travel schedule:', error)
    }
  }

  const handleCityUpdate = (newCity: string) => {
    // 기존의 data.city와 비교해서 변경되었을 때만 서버 요청
    if (data.city !== newCity && !hasPosted) {
      handlePostTravelSchedule(newCity)
    }

    // 데이터 업데이트
    setData((prevData) => ({
      ...prevData,
      city: newCity,
    }))
  }
  return (
    <View style={styles.container}>
      {/* 이미지 */}
      <View style={styles.pictureContainer}>
        <Image
          style={styles.picture}
          source={require('@/assets/maps/currentLocation.png')}
        />
      </View>
      {/*api 연결시 {{uri : string}} */}
      {/* 중간에 보일 컨테이너 장소 도시, 해시태그*/}
      <View style={styles.middleContainer}>
        <View style={styles.spotContainer}>
          <Text style={text.titleText}>{title}</Text>
        </View>
        <View>
          <Text style={text.hashtagText}>{title}</Text>
        </View>
      </View>
      {/*가장 오른쪽에 보여질 장소 추가 컨테이너 */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            // 새로운 city 값으로 업데이트
            handleCityUpdate(title)

            navigation.navigate('SceduleDetail' as never)
          }}
        >
          <Image
            source={require('@/assets/schedule/bookmark.png')}
            style={styles.bookmarkIcon}
          />
          <Text style={text.buttonText}>지역 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
