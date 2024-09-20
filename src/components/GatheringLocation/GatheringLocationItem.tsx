import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import GatheringLocation from '../../components/GatheringHome/gatheringlocationclass'
// GatheringLocationItem의 props 타입 정의
interface GatheringLocationItemProps {
  id: string
  imgURL: string
  hashtag: string
  location: string
}

const GatheringLocationItem: React.FC<GatheringLocationItemProps> = ({
  id,
  imgURL,
  hashtag,
  location,
}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.itemContainer}>
      {/* 대표 이미지 */}
      <Image source={{ uri: imgURL }} style={styles.image} />

      {/* 텍스트 정보 */}
      <View style={styles.textContainer}>
        <Text style={styles.locationName}>{location}</Text>
        <Text style={styles.hashtags}>{hashtag}</Text>
      </View>

      {/* 북마크 아이콘과 지역 선택 버튼을 타원이 감싸는 레이아웃 */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.selectButton}>
          <FontAwesome name="bookmark-o" size={18} color="#FFA07A" />
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
    flex: 1, // 남은 공간을 차지하게 설정
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
    backgroundColor: '#D3D3D3', // 타원의 배경색 (아주 연한 회색)
    borderRadius: 50, // 타원형을 위한 borderRadius 설정
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20, // 타원을 아래로 내리기 위한 여백 설정
  },
  selectButtonText: {
    color: '#FFA07A', // 연한 주황색 텍스트
    fontSize: 14,
    marginLeft: 5, // 아이콘과 텍스트 사이의 간격
  },
  largeSeperator: {
    width: '100%', // 화면 너비만큼 구분선 설정
    height: 1, // 구분선의 두께
    backgroundColor: '#ccc', // 구분선의 색상 (연한 회색)
    marginVertical: 10, // 위아래 여백 (선의 위, 아래 간격)
  },
})
