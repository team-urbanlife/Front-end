import { TouchableOpacity } from 'react-native-gesture-handler'
import ScheduleDetailComponent from './ScheduleDetailComponent'
import { View, Text } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { DetailedPlan } from '@/types/SchedulePlanType'

const DATA = [
  {
    region: '서울 타워',
    sequence: 1,
    latitude: 37.5512,
    longitude: 126.9882,
    scheduleDetailsId: 101,
    memo: '서울의 유명 관광지',
    memoId: 1001,
  },
  {
    region: '경복궁',
    sequence: 2,
    latitude: 37.5796,
    longitude: 126.977,
    scheduleDetailsId: 102,
    memo: '역사적 궁궐 방문',
    memoId: 1002,
  },
  {
    region: '서울 타워',
    sequence: 1,
    latitude: 37.5512,
    longitude: 126.9882,
    scheduleDetailsId: 101,
    memo: '서울의 유명 관광지',
    memoId: 1001,
  },
]

function renderItem({ item, drag, isActive }: RenderItemParams<DetailedPlan>) {
  return (
    <TouchableOpacity
      onLongPress={drag}
      style={{
        backgroundColor: isActive ? 'lightblue' : 'white',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        flex: 1,
      }}
    >
      <ScheduleDetailComponent data={item} />
    </TouchableOpacity>
  )
}

export default function ScheduleDetailEditComponent() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <DraggableFlatList
        data={DATA}
        onDragEnd={({ data }) => {
          console.log(data) // 드래그 후 데이터 확인
        }}
        keyExtractor={(item) => String(item.sequence)}
        renderItem={renderItem}
      />
    </View>
  )
}
