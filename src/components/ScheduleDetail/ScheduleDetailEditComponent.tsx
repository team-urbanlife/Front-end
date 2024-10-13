import { TouchableOpacity } from 'react-native-gesture-handler'
import ScheduleDetailComponent from './ScheduleDetailComponent'
import { View, Text } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { DetailedPlan } from '@/types/SchedulePlanType'
import { useState } from 'react'
import { GlobalStyles } from '@/constants/colors'
import { Dispatch, SetStateAction } from 'react'
interface Props {
  data: DetailedPlan[]
  setData: Dispatch<SetStateAction<DetailedPlan[]>>
}

function renderItem({ item, drag, isActive }: RenderItemParams<DetailedPlan>) {
  return (
    <TouchableOpacity
      onLongPress={drag}
      style={{
        paddingBottom: 10,
        flex: 1,
        backgroundColor: isActive
          ? GlobalStyles.colors.signature
          : 'transparent',
      }}
    >
      <ScheduleDetailComponent data={item} isActive={isActive} />
    </TouchableOpacity>
  )
}

export default function ScheduleDetailEditComponent({ data, setData }: Props) {
  const [innerData, setInnerData] = useState<DetailedPlan[]>(data)
  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/*부모 요소에서 렌더링 안되서 보니 flex:1을 줘서 없애줌 */}
      <DraggableFlatList
        data={innerData}
        onDragEnd={({ data }) => {
          setInnerData(data) // 드래그 후 데이터 업데이트
          setData(data)
        }}
        keyExtractor={(item) => String(item.detailedPlanId)}
        renderItem={renderItem}
      />
    </View>
  )
}
