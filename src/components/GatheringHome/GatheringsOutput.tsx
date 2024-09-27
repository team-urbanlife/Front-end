import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/colors'
import GatheringsList from './GatheringsList'
import Gathering from '../../screens/gathering/type/GatheringType'

interface GatheringsOutputProps {
  gatherings: Gathering[]
  gatheringsPeriod: string
  fallbackText: string
}

const GatheringsOutput: React.FC<GatheringsOutputProps> = ({
  gatherings,
  gatheringsPeriod,
  fallbackText,
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (gatherings.length > 0) {
    content = <GatheringsList gatherings={gatherings} />
  }

  return (
    <View style={styles.container}>
      {/* <GatheringsSummary
        gatherings={gatherings}
        periodName={gatheringsPeriod}
      /> */}
      {content}
    </View>
  )
}

export default GatheringsOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0, // 헤더 바로 밑에 붙이기 위해 padding 제거
    paddingBottom: 0,
    // backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'black', // 텍스트 색상도 확인
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16, // 여백 줄이기
  },
})
