import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import GatheringsOutput from '../../components/GatheringHome/GatheringsOutput'
import { fetchGatherings, fetchMyGatherings } from '../gathering/gatheringHttp'
import Gathering from '../gathering/type/GatheringType'

// mygatherings 상태의 타입을 명확하게 지정
const MypageGatherings: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [mygatherings, setMygatherings] = useState<Gathering[]>([]) // Gathering 배열로 타입 지정

  // useLayoutEffect로 데이터 fetch
  useLayoutEffect(() => {
    async function getMyGatherings() {
      setIsFetching(true)
      try {
        const gatherings: Gathering[] = await fetchMyGatherings() // Gathering 배열 타입
        setMygatherings(gatherings)
      } catch (error) {
        setError('Could not fetch gatherings!')
      }
      setIsFetching(false)
    }
    getMyGatherings()
  }, [])

  // 조건부 렌더링: 에러 메시지나 Gathering 목록 출력
  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <View style={styles.contentContainer}>
          <GatheringsOutput
            gatherings={mygatherings}
            gatheringsPeriod="Last 7 Days"
            fallbackText="No gatherings registered for the last 7 days."
          />
        </View>
      )}
    </View>
  )
}

export default MypageGatherings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#ff6347',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})
