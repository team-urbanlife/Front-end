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
import GatheringsOutput from '../../components/GatheringHome/GatheringsOutput'
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native'
import Gathering from './type/GatheringType'
import GatheringHomeHeader from './GatheringHomeHeader'
import { useFocusEffect } from '@react-navigation/native'
type RootStackParamList = {
  RecentGatherings: { selectedLocations: string[] } // 전달할 파라미터의 타입 정의
  GatheringRegister: undefined
}
// RecentGatherings 컴포넌트에서 사용될 route 타입 정의
type RecentGatheringsRouteProp = RouteProp<
  RootStackParamList,
  'RecentGatherings'
>

const RecentGatherings: React.FC = React.memo(() => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  // RouteProp 타입을 사용하여 route의 타입 지정
  const route = useRoute<RecentGatheringsRouteProp>()
  const routeParamObject = route.params || null

  useEffect(() => {
    console.log('넘겨받은 카테고리:', routeParamObject) // 파라미터 확인용 로그
  }, [routeParamObject])

  const handleAddPost = () => {
    navigation.navigate('GatheringRegister') // GatheringRegister 화면으로 이동
  }

  const gatheringsCtx = useContext(GatheringsContext) as GatheringsContextType

  useEffect(() => {
    async function getGatherings() {
      setIsFetching(true)
      try {
        const gatherings = await fetchGatherings()
        gatheringsCtx.setGatherings(gatherings)
      } catch (error) {
        setError('Could not fetch gatherings!')
      }
      setIsFetching(false)
    }
    getGatherings()
  }, [])

  var recentGatherings = gatheringsCtx.gatherings.filter(
    (gathering: Gathering) => {
      const today = new Date()
      const date7DaysAgo = getDateMinusDays(today, 7)
      return (
        new Date(gathering.registeredDateTime) >= date7DaysAgo &&
        new Date(gathering.registeredDateTime) <= today
      )
    },
  )
  if (routeParamObject && routeParamObject.selectedLocations.length) {
    recentGatherings = recentGatherings.filter((item) => {
      return routeParamObject.selectedLocations.includes(item.location)
      //return item.title.startsWith(routeParamObject.selectedLocations[0])
    })
  }

  return (
    <View style={styles.container}>
      <GatheringHomeHeader
        selectedLocations={
          routeParamObject && routeParamObject.selectedLocations
        }
      />
      <View style={styles.contentContainer}>
        <GatheringsOutput
          gatherings={recentGatherings}
          gatheringsPeriod="Last 7 Days"
          fallbackText="No gatherings registered for the last 7 days."
        />
      </View>
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
