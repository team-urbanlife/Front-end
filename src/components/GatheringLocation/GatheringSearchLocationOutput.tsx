import React, { useState } from 'react'
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
  selectedLocations: string[]
  setLocations: React.Dispatch<React.SetStateAction<string[]>> // 상태 변경 함수
}

const GatheringSearchLocationOutput: React.FC<
  GatheringSearchLocationOutputProps
> = ({ searchLocations, fallbackText, selectedLocations, setLocations }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (searchLocations.length > 0) {
    content = (
      <GatheringLocationList
        locations={searchLocations}
        selectedLocations={selectedLocations}
        setLocations={setLocations}
      />
    )
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
