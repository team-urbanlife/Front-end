import { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  GatheringsContext,
  GatheringsContextType,
} from '../../context/gathering-context'
import { fetchGatherings } from './gatheringHttp'
import { getDateMinusDays } from '../../util/date'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { Gatherings } from '../../components/GatheringHome/dummy-gathering'
import GatheringsOutput from '../../components/GatheringHome/GatheringsOutput'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Gathering from '../../components/GatheringHome/gatheringclass'

type RootStackParamList = {
  RecentGatherings: undefined
  GatheringRegister: undefined
}

const RecentGatherings: React.FC = React.memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleAddPost = () => {
    navigation.navigate('GatheringRegister') // GatheringRegister 화면으로 이동
  }

  // GatheringsContext에서 가져오는 gatherings에 Gathering[] 타입을 지정
  const gatheringsCtx = useContext(GatheringsContext) as GatheringsContextType

  useEffect(() => {
    gatheringsCtx.setGatherings(Gatherings)
  }, [])

  // 최근 모임 필터링 (최근 7일)
  const recentGatherings = gatheringsCtx.gatherings.filter(
    (gathering: Gathering) => {
      const today = new Date()
      const date7DaysAgo = getDateMinusDays(today, 100)

      return (
        gathering.registerDate >= date7DaysAgo &&
        gathering.registerDate <= today
      )
    },
  )

  return (
    <View style={styles.container}>
      <GatheringsOutput
        gatherings={recentGatherings}
        gatheringsPeriod="Last 7 Days"
        fallbackText="No gatherings registered for the last 7 days."
      />
      {/* 하단 고정된 + 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
})

export default RecentGatherings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    position: 'absolute', // 화면 고정
    bottom: 20, // 하단에서 20px 위
    right: 20, // 우측에서 20px 왼쪽
    width: 60, // 버튼 크기
    height: 60, // 버튼 크기
    backgroundColor: '#ff6347', // 버튼 배경색 (원하는 색상으로 변경 가능)
    borderRadius: 30, // 원형으로 만들기
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // 그림자 (Android)
    shadowColor: '#000', // 그림자 (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})
