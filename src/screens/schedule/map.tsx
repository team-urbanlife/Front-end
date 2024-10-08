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
              image={require('../../assets/maps/currentLocation.png')}
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
                  image={require('../../assets/maps/currentLocation.png')}
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
