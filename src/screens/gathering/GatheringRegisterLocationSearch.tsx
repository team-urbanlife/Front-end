import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, MapPressEvent } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { GOOGLE_GEOCODING_API_KEY } from '@env'
import { GlobalStyles } from '@/constants/colors'

interface LocationCoords {
  latitude: number
  longitude: number
}

export default function GatheringRegisterLocationSearchScreen() {
  const [markerCoordinate, setMarkerCoordinate] =
    useState<LocationCoords | null>(null)
  const [locationName, setLocationName] = useState<string | null>(null)
  const navigation = useNavigation()

  // Google Maps Geocoding API를 사용하여 간략한 위치(도시, 나라) 정보 가져오기
  const getLocationName = async (latitude: number, longitude: number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOCODING_API_KEY}`

    try {
      const response = await axios.get(url)
      const addressComponents = response.data.results[0].address_components

      // 도시 및 나라 정보 추출
      let city = ''
      let country = ''
      let region = ''

      addressComponents.forEach((component: any) => {
        if (component.types.includes('locality')) {
          city = component.long_name // 도시 정보
        }
        if (component.types.includes('administrative_area_level_1')) {
          region = component.long_name // 행정 구역 정보 (서울 같은 대도시)
        }
        if (component.types.includes('country')) {
          country = component.long_name // 나라 정보
        }
      })

      // 도시나 행정 구역이 있다면 그 정보를 표시, 없으면 나라만 표시
      const location =
        city || region ? `${city || region}, ${country}` : country
      setLocationName(location)
    } catch (error) {
      console.error('Error fetching location name: ', error)
    }
  }

  const handleMapPress = (event: MapPressEvent) => {
    const coordinate = event.nativeEvent.coordinate
    setMarkerCoordinate(coordinate)
    getLocationName(coordinate.latitude, coordinate.longitude)
  }

  const handleConfirmLocation = () => {
    if (locationName) {
      navigation.navigate('GatheringRegister', {
        locationName: locationName,
        longitude: markerCoordinate?.longitude,
        latitude: markerCoordinate?.latitude,
      })
    }
  }

  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5665, // 서울 위도
          longitude: 126.978, // 서울 경도
          latitudeDelta: 5.0, // 훨씬 넓은 범위로 축소
          longitudeDelta: 5.0, // 축소된 경도 범위
        }}
        onPress={handleMapPress}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        {markerCoordinate && (
          <Marker
            coordinate={markerCoordinate}
            image={require('../../assets/maps/currentLocation.png')} // 이전에 사용하던 마커 이미지
            style={{ width: 10, height: 10 }}
          />
        )}
      </MapView>

      {/* 선택된 위치 정보 및 확인 버튼 */}
      {locationName && (
        <View style={styles.infoBox}>
          <Text style={styles.locationText}>{locationName}</Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmLocation}
          >
            <Text style={styles.buttonText}>위치 확인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '70%',
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    position: 'absolute',
    bottom: 160,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: GlobalStyles.colors.signature,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
})
