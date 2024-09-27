import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface GatheringLocationItemProps {
  id: string
  imgURL: string
  hashtag: string
  location: string
  selectedLocations: string[]
  setLocations: React.Dispatch<React.SetStateAction<string[]>>
}

const GatheringLocationItem: React.FC<GatheringLocationItemProps> = ({
  id,
  imgURL,
  hashtag,
  location,
  selectedLocations,
  setLocations,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false) // 북마크 상태 관리

  // 상태가 변경될 때마다 selectedLocations 값을 추적
  useEffect(() => {
    console.log('선택한 지역 정보들:', selectedLocations)
  }, [selectedLocations])

  function addLocations() {
    const alreadySelected = selectedLocations.includes(location)

    if (!alreadySelected) {
      setLocations([...selectedLocations, location]) // 선택된 지역이 없으면 추가
    } else {
      setLocations(selectedLocations.filter((item) => item !== location)) // 선택된 지역이 있으면 제거
    }

    setIsBookmarked(!isBookmarked) // 상태를 토글하여 아이콘 및 스타일 변경
  }

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imgURL }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.locationName}>{location}</Text>
        <Text style={styles.hashtags}>{hashtag}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.selectButton,
            isBookmarked ? styles.bookmarkedButton : null, // 상태에 따라 스타일 적용
          ]}
          onPress={addLocations}
        >
          <FontAwesome
            name={isBookmarked ? 'bookmark' : 'bookmark-o'} // 북마크 상태에 따른 아이콘 변경
            size={18}
            color="#FFA07A"
          />
          <Text style={styles.selectButtonText}>지역 선택</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GatheringLocationItem

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    height: 110,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hashtags: {
    fontSize: 14,
    color: '#888',
  },
  actionsContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  bookmarkedButton: {
    backgroundColor: '#FF6347', // 북마크된 상태일 때의 배경색
  },
  selectButtonText: {
    color: '#FFA07A',
    fontSize: 14,
    marginLeft: 5,
  },
})
