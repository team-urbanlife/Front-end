import React from 'react'
import { FlatList } from 'react-native'
import GatheringItem from './GatheringItem'
import Gathering from '../../screens/gathering/type/GatheringType'

interface GatheringsListProps {
  gatherings: Gathering[]
}

const renderGatheringItem = (itemData: { item: Gathering }) => {
  //console.log(itemData.item)
  return <GatheringItem {...itemData.item} />
}

const GatheringsList: React.FC<GatheringsListProps> = ({ gatherings }) => {
  return (
    <FlatList
      data={gatherings}
      renderItem={renderGatheringItem}
      keyExtractor={(item) => item.accompanyId.toString()}
    />
  )
}

export default GatheringsList
