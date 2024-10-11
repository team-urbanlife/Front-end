import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete'
import { GlobalStyles } from '@/constants/colors'
import { styles, text } from './Styles/SchedulePlaceSearchStyles'
import { useNavigation } from '@react-navigation/native'

import { GOOGLE_PLACES_API_KEY } from '@env'

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

export default function PlaceSearchComponent() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="장소를 검색해보세요"
        onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null) => {
          console.log('Details:', details) //디테일에 있는 위도 경도 값을 업데이트 하기 전역으로 관리 일정으로 넘어갈 때 그 값을 받아가기
          //일정 리스트는
          if (!details) {
            console.error('Failed to retrieve place details')
            return
          }

          console.log(data)
          const { name, geometry, photos } = details

          const latitude = geometry?.location?.lat
          const longitude = geometry?.location?.lng

          if (photos && photos.length > 0) {
            const photoRef = photos[0].photo_reference
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`
            console.log('Photo URL:', photoUrl)
          } else {
            console.log('No photos available for this place')
          }
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
            {/* 장소 추가 버튼 */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate('SceduleDetail' as never) //여기서 받아갈 때 위도 경도 값을 받아가기
              }}
            >
              <Image
                source={require('@/assets/schedule/bookmark.png')}
                style={styles.bookmarkIcon}
              />
              <Text style={{ color: GlobalStyles.colors.signature }}>
                장소 추가
              </Text>
            </TouchableOpacity>
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
