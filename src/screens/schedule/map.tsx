import { Text, View, StyleSheet, Image } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import MapView, { Marker, MapPressEvent } from 'react-native-maps'
import * as Location from 'expo-location'
import { DetailedPlan } from '@/types/SchedulePlanType'
import { PlanData } from '@/types/SchedulePlanType'
import { getDetailedPlans } from '@/api/Schedule/getDetailedPlansApi'
import { useFocusEffect } from '@react-navigation/native'
import { useSchedule } from '@/context/ScheduleProvide'

interface LocationCoords {
  latitude: number
  longitude: number
}
interface Props {
  plans: PlanData[]
}
export default function AppleMap({ plans }: Props) {
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
  const { scheduleId } = useSchedule()
  const [location, setLocation] = useState<LocationCoords | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isMapReady, setIsMapReady] = useState(false)

  const [markers, setMarkers] = useState<DetailedPlan[]>()
  const [markerCoordinate, setMarkerCoordinate] =
    useState<LocationCoords | null>(null)
  const [region, setRegion] = useState({
    latitude: 37.5665, // 기본 좌표 (서울)
    longitude: 126.978, // 기본 좌표 (서울)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  useFocusEffect(
    useCallback(() => {
      // 위치가 변경되었을 때, 상태를 업데이트하여 MapView의 region 변경
      if (plans && plans[0] && plans[0].detailedPlans) {
        setRegion({
          latitude: plans[0].detailedPlans[0].latitude, // 기본 좌표 (서울)
          longitude: plans[0].detailedPlans[0].longitude, // 기본 좌표 (서울)
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        })
      }
    }, [plans]),
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (plans && plans[0] && plans[0].detailedPlans) {
      setMarkers(plans[0].detailedPlans)
    }
  }, [plans])
  return (
    <View style={styles.screen}>
      {isMapReady && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          cacheEnabled={true}
        >
          {markers &&
            markers.map((plan, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: plan.latitude,
                  longitude: plan.longitude,
                }}
                onPress={() => {}}
              >
                <Image
                  source={markerImages[index % markerImages.length]}
                  style={{
                    width: 50,
                    height: 70,
                    resizeMode: 'contain',
                  }}
                />
              </Marker>
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
