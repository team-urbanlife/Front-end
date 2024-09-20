import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GatheringLocationList from './GatheringLocationList'

interface GatheringLocation {
  id: string
  imgURL: string
  hashtag: string
  location: string
}

interface GatheringSearchLocationOutputProps {
  searchLocations: GatheringLocation[]
  fallbackText: string
}

const GatheringSearchLocationOutput: React.FC<
  GatheringSearchLocationOutputProps
> = ({ searchLocations, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (searchLocations.length > 0) {
    content = <GatheringLocationList locations={searchLocations} />
  }

  return <View style={styles.container}>{content}</View>
}

export default GatheringSearchLocationOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    //backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
})
