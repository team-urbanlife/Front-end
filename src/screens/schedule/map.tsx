import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import MapView, { Marker, MapPressEvent } from 'react-native-maps'
import * as Location from 'expo-location'
import { DetailedPlan } from '@/types/SchedulePlanType'

interface LocationCoords {
  latitude: number
  longitude: number
}

export default function AppleMap() {
  //require함수가 동적으로 이미지 경로를 받지 못해서 일정의 순서에 따라 배열 인덱싱을 통해 image source를 전달할 예정
  const markerImages = [
    require('@/assets/maps/1.png'),
    require('@/assets/maps/2.png'),
    require('@/assets/maps/3.png'),
    require('@/assets/maps/4.png'),
    require('@/assets/maps/5.png'),
    require('@/assets/maps/6.png'),
    require('@/assets/maps/7.png'),
    require('@/assets/maps/8.png'),
    require('@/assets/maps/9.png'),
    require('@/assets/maps/10.png'),
  ]

  const [location, setLocation] = useState<LocationCoords | null>(null)

  const [errorMsg, setErrorMsg] = useState<string>('')

  //지도 호출
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsMapReady(true)
    }, 1000)
  }, [])

  // 마커 좌표를 저장하는 state (Coordinate 타입)
  const [markerCoordinate, setMarkerCoordinate] =
    useState<LocationCoords | null>(null)

  const [planList, setPlanList] = useState<DetailedPlan[]>()
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
      {isMapReady && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
          cacheEnabled={true}
        >
          {markerCoordinate && (
            <Marker
              coordinate={markerCoordinate}
              image={require('@/assets/maps/currentLocation.png')}
              style={{ width: 10, height: 10 }}
            />
          )}
          {planList &&
            planList.map((plan, index) => {
              return (
                <Marker
                  coordinate={{
                    latitude: plan.latitude,
                    longitude: plan.longitude,
                  }}
                  image={markerImages[index]}
                  onPress={() => {}}
                  style={{ width: 20, height: 20 }}
                  key={index}
                />
              )
            })}
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
