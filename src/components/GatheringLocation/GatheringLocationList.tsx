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
}

const renderGatheringLocationItem = (itemData: { item: GatheringLocation }) => {
  return <GatheringLocationItem {...itemData.item} />
}

const GatheringsLocationList: React.FC<GatheringsLocationListProps> = ({
  locations,
}) => {
  return (
    <FlatList
      data={locations}
      renderItem={renderGatheringLocationItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default GatheringsLocationList
