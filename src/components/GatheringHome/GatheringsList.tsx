import React from 'react'
import { FlatList } from 'react-native'
import GatheringItem from './GatheringItem'
import Gathering from '../../components/GatheringHome/gatheringclass'

interface GatheringsListProps {
  gatherings: Gathering[]
}

const renderGatheringItem = (itemData: { item: Gathering }) => {
  return <GatheringItem {...itemData.item} />
}

const GatheringsList: React.FC<GatheringsListProps> = ({ gatherings }) => {
  return (
    <FlatList
      data={gatherings}
      renderItem={renderGatheringItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default GatheringsList
