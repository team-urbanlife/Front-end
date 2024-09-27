import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native'
import GatheringSearchLocationOutput from '../../components/GatheringLocation/GatheringSearchLocationOutput'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { GatheringLocations } from '../../components/GatheringHome/dummy-location'
import GatheringLocation from '../../components/GatheringHome/gatheringlocationclass'

interface GatheringLocationHeaderProps {
  onChangeText: (text: string) => void
}

const GatheringLocationHeader: React.FC<GatheringLocationHeaderProps> = ({
  onChangeText,
}) => {
  const navigation = useNavigation<NavigationProp<any>>()

  const handleTextChange = (inputText: string) => {
    onChangeText(inputText)
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchHeaderContainer}>
        {/* 뒤로 가기 아이콘 */}
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Entypo name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        {/* 검색창과 돋보기 아이콘을 한 뷰로 묶음 */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="검색어를 입력하세요"
            onChangeText={handleTextChange}
            style={styles.searchTextInput}
          />
          {/* 돋보기 아이콘 */}
          <TouchableOpacity>
            <Icon
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

interface GatheringLocationSearchProps {
  route: any
  navigation: any
}

const GatheringLocationSearch: React.FC<GatheringLocationSearchProps> = ({
  route,
  navigation,
}) => {
  const [searchText, setSearchText] = useState<string>('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  const handleTextChange = (inputText: string) => {
    setSearchText(inputText)
  }

  useEffect(() => {
    console.log('현재 선택된 지역 개수: ', selectedLocations.length)
  }, [selectedLocations]) // selectedLocations 상태 변경 시마다 콘솔에 출력

  const searchedLocations: GatheringLocation[] = GatheringLocations.filter(
    (ele: GatheringLocation) => ele.location.startsWith(searchText),
  )
  function completeHandler() {
    navigation.navigate('BtRecentGathering', {
      selectedLocations: selectedLocations,
    })
  }
  return (
    <View style={styles.container}>
      <GatheringLocationHeader onChangeText={handleTextChange} />
      <GatheringSearchLocationOutput
        searchLocations={searchedLocations}
        fallbackText="No Data Here"
        selectedLocations={selectedLocations}
        setLocations={setSelectedLocations}
      />
      <TouchableOpacity
        style={[
          styles.completeButton,
          selectedLocations.length > 0
            ? styles.completeButtonActive // 조건에 따른 스타일 적용
            : styles.completeButtonInactive, // 기본 비활성화 스타일
        ]}
        onPress={completeHandler}
      >
        <Text style={styles.completeButtonText}>선택 완료</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GatheringLocationSearch

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  completeButton: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  completeButtonActive: {
    backgroundColor: '#FF6347', // 선택된 항목이 있을 때 활성화된 배경색
  },
  completeButtonInactive: {
    backgroundColor: '#D3D3D3', // 선택된 항목이 없을 때 기본 배경색
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  safeArea: {
    height: 80,
    backgroundColor: '#fff',
  },
  searchHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
  },
  searchTextInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
})
