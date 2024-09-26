import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import MapView, { Marker, MapPressEvent } from 'react-native-maps'
import * as Location from 'expo-location'

interface LocationCoords {
  latitude: number
  longitude: number
}
const planList = [{ latitude: 5, longitude: 5 }]

export default function AppleMap() {
  //현재 위치 위도, 경도 생각해보니까 이건 현재 위도 경도를 받아올 필요가 없음
  const [location, setLocation] = useState<LocationCoords | null>(null)
  //에러 메세지
  const [errorMsg, setErrorMsg] = useState<string>('')

  // 마커 좌표를 저장하는 state (Coordinate 타입)
  const [markerCoordinate, setMarkerCoordinate] =
    useState<LocationCoords | null>(null)
  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('위치 정보 허용이 거절당했습니다.')
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({}) //혀내 사용자 위치 받아오기
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      })
    })()
  }, [])

  let txt = 'Waiting..'
  if (errorMsg) {
    txt = errorMsg
  } else if (location) {
    txt = JSON.stringify(location)
  }

  const handleMapPress = (event: MapPressEvent) => {
    // 터치한 좌표를 state에 저장
    setMarkerCoordinate(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.screen}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          {markerCoordinate && (
            <Marker
              coordinate={markerCoordinate}
              image={require('../../assets/maps/currentLocation.png')}
              style={{ width: 10, height: 10 }}
            />
          )}
          {planList &&
            planList.map((plan, index) => (
              <Marker
                coordinate={{
                  latitude: plan.latitude,
                  longitude: plan.longitude,
                }}
                image={require('../../assets/maps/currentLocation.png')}
                onPress={() => {}}
                style={{ width: 20, height: 20 }}
                key={index}
              />
            ))}
        </MapView>
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
    height: '100%',
  },
})
