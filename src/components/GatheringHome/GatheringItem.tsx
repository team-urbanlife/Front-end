import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Gathering from './gatheringclass'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// 네비게이션 스택 타입 정의
type RootStackParamList = {
  GatheringDetail: { gatheringId?: string }
  // 다른 스크린 타입이 있다면 여기에 추가
}

// GatheringDetailScreen의 네비게이션 타입 정의
type GatheringDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GatheringDetail'
>

const GatheringItem: React.FC<Gathering> = ({
  id,
  period,
  title,
  content,
  author,
  commentCnt,
  registerDate,
  location,
}) => {
  // navigation에 타입 지정
  const navigation = useNavigation<GatheringDetailScreenNavigationProp>()

  function gatheringPressHandler() {
    navigation.navigate('GatheringDetail', {
      gatheringId: id,
    })
  }

  return (
    <Pressable
      onPress={gatheringPressHandler}
      style={({ pressed }) => [styles.gatheringItem, pressed && styles.pressed]}
    >
      <View style={styles.topContainer}>
        <Icon
          name="calendar-outline"
          size={16}
          color="#FF6B6B"
          style={styles.icon}
        />
        <Text style={styles.periodText}>{period}</Text>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.content}>
          {content}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Icon name="person" size={16} color="#999" style={styles.icon} />
        <Text style={styles.bottomText}>{author}</Text>

        {/* 구분선 */}
        <Text style={styles.separator}>|</Text>

        {/* 경과 시간 */}
        <Text style={styles.bottomText}>
          {new Date().getDate() - registerDate.getDate()}일 전
        </Text>

        {/* 구분선 */}
        <Text style={styles.separator}>|</Text>

        {/* 댓글 수 */}
        <Icon
          name="chatbubble-outline"
          size={16}
          color="#999"
          style={styles.commentIcon}
        />
        <Text style={styles.bottomText}>{commentCnt}</Text>
      </View>

      {/* 하단 수평바 */}
      <View style={styles.separatorBar}></View>
    </Pressable>
  )
}

export default GatheringItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  gatheringItem: {
    paddingVertical: 16,
    paddingHorizontal: 0, // 좌우 패딩 없음
    marginVertical: 8,
    backgroundColor: 'transparent', // 투명 배경
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 5,
  },
  periodText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  contentContainer: {
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 5, // 구분선과 텍스트 사이 간격
  },
  separator: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 5, // 구분선 좌우 간격
  },
  commentIcon: {
    marginRight: 2, // 댓글 아이콘과 댓글 수 간의 간격을 좁힘
  },
  separatorBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc', // 연한 회색 수평바
    marginTop: 16,
  },
})
