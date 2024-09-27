import React from 'react'
import { FlatList } from 'react-native'
import GatheringLocationItem from './GatheringLocationItem'

// GatheringLocation 타입 정의
interface GatheringLocation {
  id: string
  imgURL: string
  hashtag: string
  location: string
}

interface GatheringsLocationListProps {
  locations: GatheringLocation[]
  selectedLocations: string[]
  setLocations: React.Dispatch<React.SetStateAction<string[]>> // 상태 변경 함수
}

const GatheringsLocationList: React.FC<GatheringsLocationListProps> = ({
  locations,
  selectedLocations,
  setLocations,
}) => {
  const renderGatheringLocationItem = (itemData: {
    item: GatheringLocation
  }) => {
    return (
      <GatheringLocationItem
        {...itemData.item}
        selectedLocations={selectedLocations}
        setLocations={setLocations}
      />
    )
  }

  return (
    <FlatList
      data={locations}
      renderItem={renderGatheringLocationItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default GatheringsLocationList
