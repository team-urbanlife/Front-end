import React, { useLayoutEffect, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getFormattedDate2 } from '../../util/date'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { fetchGatheringDetail } from './gatheringHttp'
import Gathering from './type/GatheringType'
import { styles as scheduleStyles } from '../schedule/Styles/ScheduleHomeStyles'
import { GlobalStyles } from '@/constants/colors'
import { createChatRoom } from '../chat/chatHttp'
type RootStackParamList = {
  RecentGathering: undefined
  GatheringLocationSearch: undefined
  GatheringRegister: undefined
  GatheringDetail: { gatheringId: number }
  ChatRoomDetail: { roomId: number; title: string }
}

interface GatheringDetailScreenProps {
  route: RouteProp<RootStackParamList, 'GatheringDetail'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'GatheringDetail'>
}

const GatheringDetailScreen: React.FC<GatheringDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [selectedGathering, setSelectedGathering] = useState<Gathering | null>(
    null,
  )

  async function reqDongHang() {
    const roomId = await createChatRoom(route.params.gatheringId)
    console.log('reqDongHang요청이전에 데이터 확인', roomId)
    if (selectedGathering?.title) {
      navigation.navigate('ChatRoomDetail', {
        roomId: +roomId,
        title: selectedGathering.title,
      })
    } else {
      console.error('Gathering title is undefined')
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '', // 가운데 타이틀
      headerRight: () => (
        <View style={scheduleStyles.searchNotiContainer}>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('' as never)
            }}
          >
            {/* <Image
              source={require('@/assets/schedule/search.png')}
              style={scheduleStyles.searchNotiIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('' as never)
            }}
          >
            <Image
              source={require('@/assets/notification.png')}
              style={scheduleStyles.searchNotiIcon}
            />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  // 비동기 데이터 가져오기
  useLayoutEffect(() => {
    const gatheringId = route.params.gatheringId

    const loadGathering = async () => {
      try {
        const foundGathering = await fetchGatheringDetail(gatheringId)
        setSelectedGathering(foundGathering || null)
      } catch (error) {
        console.error('Error fetching gatherings:', error)
      }
    }

    loadGathering()
  }, [route.params.gatheringId])

  if (!selectedGathering) {
    return (
      <View>
        <Text>모임을 찾을 수 없습니다.</Text>
      </View>
    )
  }

  const dummyDetailInfo = [
    { icon: 'place', text: selectedGathering.location, color: 'orange' },
    {
      icon: 'people',
      text: selectedGathering.personnel + '명',
      color: 'black',
    },
    {
      icon: 'man',
      text:
        selectedGathering.gender === 'MAN'
          ? '남자만'
          : selectedGathering.gender === 'WOMAN'
            ? '여자만'
            : '상관없음',
      color: 'black',
    },
    {
      icon: 'money',
      text: selectedGathering.cost + '만원',
      color: 'black',
    },
  ]
  const userProfile = selectedGathering.userProfileImage
  const renderHeader = () => (
    <View style={styles.container}>
      {/* 상단 게시물 정보 */}
      <View style={styles.postHeader}>
        <View style={styles.leftHeader}>
          <Image
            source={{
              //uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAeFBMVEX////+AAD/ubn/9fX/5OT/srL/xcX/vLz/2tr/qKj/4eH+lJT/6Oj/+Pj+b2/+Li7/rKz+ODj+YWH/8PD+HBz/1NT+UVH/zMz+f3/+VVX+S0v+Wlr+ExP+i4v+Rkb+JCT+o6P+QED/hIT+PT3+dXX+lpb+Kyv+aGgfaNvJAAADdUlEQVR4nO3dgVLiMBDGcQNIEUFAqEUBFe/U93/Duw7jCZNyNG2yO1v/vyfofkObNFnSqysAAAAAAAAAAAAAAAAAAFCajvNimGXZsMjHU+2LUdfP5+vHlTu2elzP8772hWkpdr/cOfvbXPvy5GWfZ/P4ctf7STfSaH0xkIPfI+1LFZI91Uyk9DTUvlwB2SwgkdIs077kxIqPwERKH4X2ZSc02TRIpLSZaF96Ku8NEym9a198EoPQB8mp2UC7gPjmrRIpzbVLiO2udSR/ZyvaRUTVX0SIxLlFh96DxlESKY21S4llFC0S5zoy2Y8ZSUdCiXfjHHTg9hlEjsQ58xOV/jZ6Jlvro0+cQfjUQruodmJM1Xx32mW1cZMkEudutAtrLvaQ883u4NNkAameD+3Smtoli8S5nXZxzaS7c0o2757npJk8a5fXRJY0EucsLufHn8Ce2moXGC7V1OSbvUlK8kic0y4xVPsl6cusLVq/CGTyol1kmKFAJM7Z2l+/F8nkXrvMEEuRSJxbahca4FUoE0vDcdpp/bcn7ULr6wtF4pydjreeWCZ2XnrSrMJWsbMyKxaJnfl9/G2u86xsgMk9TpzraRdb061gJrfaxdYkM7E/sDK9b9fMF2amXWw9U8FIrMzaJqKZ2OgmjtuXdImNvqVCNBMbvfipN3ZO2XjjuRbN5Fq73FrS7+wcs7F4L5uJjaU2MvHxPPEx7vhk9ru+2Nj3ykUzsfF/dd53fLwXV2D9xMc6m4/1WJ/kur2N6YnswGNj2LliH7AK+8U+uQeKlW1AudYt5wz9NfBBKJIH7UIDSHQMl2wsPB7Q91iB/lgffdQV6Lf38b+MCgKZaJcYLH17+at2ieGSZ6JdYAOpX3rsvOoc2SeNZK9dXiNp+5Vs9Cd5OK+gAuda+Dj/pALn5FTgPKUKnLvlS/DXQPPns3GOe6zAuaAVYv5SOvErKU1inSO0MrNlftl0HyWSvZFGrZrqfknlf9baRcTWvrvaRsd0kEnL7yB06FFypE2fm5W+tWCDpv0GDx2Yu541bDIqb43tgQa7Xl0O4cSqg89WT28fkMizyS2LBmp/923dkbebeoaXV+A+f8pP5EixO78It1h3/bl61rKYv21O53KzzdsP/t7oP9PlOC+yLCvy8bJbb3kAAAAAAAAAAAAAAAAAADT3BzugNrnOETdrAAAAAElFTkSuQmCC',
              uri: userProfile,
            }}
            style={styles.profileImage}
          />
          <View style={styles.postInfo}>
            <Text style={styles.userName}>{selectedGathering.userName}</Text>
            <Text style={styles.postTime}>
              {getFormattedDate2(
                new Date(selectedGathering.registeredDateTime),
              )}
            </Text>
          </View>
        </View>

        {/* 드롭다운 아이콘 */}
        <TouchableOpacity onPress={() => console.log('드롭다운 클릭')}>
          <FontAwesome name="ellipsis-v" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* 제목과 기간 (회색 박스 위) */}
      <View style={styles.dateTitleContainer}>
        <View style={styles.dateContainer}>
          <MaterialIcons
            name="calendar-today"
            size={24} // 아이콘 크기 확대
            color={GlobalStyles.colors.signature}
            style={styles.dateIcon}
          />
          <Text style={styles.dateRange}>
            {selectedGathering.startDate} ~ {selectedGathering.endDate}
          </Text>
        </View>
        <Text style={styles.title}>{selectedGathering.title}</Text>
      </View>

      {/* 게시물 세부 정보 */}
      <View style={styles.postDetails}>
        <Text style={styles.sectionHeader}>세부 모집 정보</Text>
        {dummyDetailInfo.map((item, index) => (
          <View key={index} style={styles.detailItem}>
            <MaterialIcons
              name={item.icon}
              size={24} // 아이콘 크기 확대
              color={item.color}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* 본문 내용 */}
      <Text style={styles.content}>{selectedGathering.content}</Text>

      {/* 조회수, 좋아요, 댓글, 공감, 저장하기 버튼을 한 줄에 배치 */}
      <View style={styles.statsAndButtonsContainer}>
        {/* 조회수, 좋아요, 댓글 */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>조회수 {selectedGathering.views}</Text>
          <FontAwesome name="heart" size={18} color="red" />
          <Text style={styles.statsText}>{selectedGathering.likeCount}</Text>
        </View>

        {/* 공감, 저장하기 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>공감</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={[]} // 데이터는 없지만 헤더만 표시
        renderItem={null} // 데이터 항목을 렌더링하지 않음
        ListHeaderComponent={renderHeader} // 헤더 렌더링
        contentContainerStyle={{ paddingBottom: 16 }} // 여유 공간 추가
      />
      <TouchableOpacity style={styles.completeButton} onPress={reqDongHang}>
        <Text style={styles.completeButtonText}>동행 요청</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white', // 전체 배경을 흰색으로 설정
  },
  container: {
    padding: 15, // 패딩을 늘려서 전체적으로 더 여유롭게
    backgroundColor: 'white', // 전체 배경 흰색 유지
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60, // 프로필 이미지 크기 확대
    height: 60,
    borderRadius: 30,
  },
  postInfo: {
    marginLeft: 15,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18, // 텍스트 크기 확대
  },
  postTime: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  dateTitleContainer: {
    marginVertical: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 10,
  },
  dateRange: {
    color: GlobalStyles.colors.signature,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18, // 제목 크기 확대
    fontWeight: 'bold',
    marginTop: 4,
  },
  postDetails: {
    padding: 16,
    backgroundColor: 'white', // 세부 정보 배경 흰색으로 설정
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
  },
  content: {
    marginVertical: 18,
    lineHeight: 24, // 텍스트 라인 높이 조정
  },
  statsAndButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 16, // 텍스트 크기 확대
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#fde7e7',
    paddingVertical: 10, // 버튼 패딩을 조금 더 넉넉하게
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: '#f56c6c',
    fontSize: 16, // 버튼 텍스트 크기 확대
  },
  completeButton: {
    position: 'absolute',
    bottom: 250,
    width: '90%',
    height: 50,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default GatheringDetailScreen
