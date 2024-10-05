import { TouchableOpacity } from 'react-native-gesture-handler'
import ScheduleDetailComponent from './ScheduleDetailComponent'
import { View, Text } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { DetailedPlan } from '@/types/SchedulePlanType'
import { useState } from 'react'
import { GlobalStyles } from '@/constants/colors'
interface Props {
  schedules: DetailedPlan[]
}

function renderItem({ item, drag, isActive }: RenderItemParams<DetailedPlan>) {
  return (
    <TouchableOpacity
      onLongPress={drag}
      style={{
        paddingBottom: 10,
        flex: 1,
      }}
    >
      <ScheduleDetailComponent data={item} isActive={isActive} />
    </TouchableOpacity>
  )
}

export default function ScheduleDetailEditComponent({ schedules }: Props) {
  const [data, setData] = useState<DetailedPlan[]>(schedules)
  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/*부모 요소에서 렌더링 안되서 보니 flex:1을 줘서 없애줌 */}
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => {
          setData(data) // 드래그 후 데이터 업데이트
          console.log(data) // 서버로 보내는 대신 콘솔로 출력하여 확인
        }}
        keyExtractor={(item) => String(item.scheduleDetailsId)}
        renderItem={renderItem}
      />
    </View>
  )
}
