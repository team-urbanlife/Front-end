import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete'
import { GlobalStyles } from '@/constants/colors'
import { styles, text } from './Styles/SchedulePlaceSearchStyles'

import { GOOGLE_PLACES_API_KEY } from '@env'
import { PostDetailedScheduleType } from '@/types/postDetailedScheduleType'
import { postDetailedSchedule } from '@/api/Schedule/postDetailedScheduleApi'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { useSchedule } from '@/context/ScheduleProvide'
interface PlaceSearchprop {
  detailedId: number
  date: string
}

interface GooglePlaceDetail {
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  name: string
  photos?: Array<{
    photo_reference: string
  }>
}

export default function PlaceSearchComponent({
  detailedId,
  date,
}: PlaceSearchprop) {
  const navigation = useNavigation()
  const { scheduleId, writeDone, setWriteDone } = useSchedule()
  console.log(detailedId, '아이디값 검색창에 잘 옴')

  const [name, setName] = useState<string>()
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  const [isSchedulePosted, setIsSchedulePosted] = useState<boolean>(false)

  const handlePostDetailedSchedule = async () => {
    if (name && latitude && longitude) {
      const newSchedule: PostDetailedScheduleType = {
        date: date,
        name: name,
        latitude: latitude,
        longitude: longitude,
      }
      console.log('보낼 상세 계획 데이터:', newSchedule)
      setWriteDone(!writeDone)
      try {
        // 버튼이 눌렸을 때 post 요청
        await postDetailedSchedule(newSchedule, detailedId)
        setIsSchedulePosted(true)
      } catch (error) {
        console.error('Error posting detailed schedule:', error)
      }
    }
  }

  useEffect(() => {
    if (name && latitude && longitude && !isSchedulePosted) {
      handlePostDetailedSchedule()
    }
  }, [name, latitude, longitude])

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="장소를 검색해보세요"
        onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null) => {
          console.log('Details:', details)
          if (!details) {
            console.error('Failed to retrieve place details')
            return
          }
          if (details) {
            setLatitude(details.geometry.location.lat)
            setLongitude(details.geometry.location.lng)
            setName(details.name)
          }

          const { name, geometry, photos } = details

          if (geometry) {
            const latitude = geometry.location.lat
            const longitude = geometry.location.lng
            console.log(`위도: ${latitude}, 경도: ${longitude}`)
          }

          // if (photos && photos.length > 0) {
          //   const photoRef = photos[0].photo_reference
          //   const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`
          //   console.log('Photo URL:', photoUrl)
          // } else {
          //   console.log('No photos available for this place')
          // }

          //상세일정에서 서버에 데이터를 호출할 때 포커스시에 데이터 요청을 하고 state를 리렌더링하기 때문에 조건 아래에서 네비게이션을 해줄 필요가 없었음
          navigation.navigate('SceduleDetail' as never)
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'ko',
          components: 'country:kr',
        }}
        fetchDetails={true}
        renderLeftButton={() => (
          <TouchableOpacity
            style={styles.backButtonContainier}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Image
              source={require('@/assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        renderRightButton={() => (
          <View style={styles.searchIconContainer}>
            <Image
              source={require('@/assets/schedule/searchButton.png')}
              style={styles.searchIcon}
            />
          </View>
        )}
        renderRow={(data: GooglePlaceData) => (
          <View style={styles.searchResultContainer}>
            <Image
              source={require('@/assets/maps/currentLocation.png')}
              style={styles.currentLocationIcon}
            />
            {/* 장소 이름 */}
            <Text style={{ flex: 1, fontSize: 16 }}>
              {data.structured_formatting.main_text}
            </Text>
          </View>
        )}
        styles={{
          textInputContainer: {
            width: '100%',
          },
          textInput: {
            height: 50,
            width: 368,
            fontSize: 16,
            backgroundColor: GlobalStyles.colors.gray,
            borderRadius: 30,
            marginRight: 20,
            flex: 1,
          },
          listView: {
            position: 'absolute',
            top: 55,
            width: '100%',
          },
        }}
      />
    </View>
  )
}
