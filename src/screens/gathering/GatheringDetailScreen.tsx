import React, { useLayoutEffect } from 'react'
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
import { Gatherings } from '../../components/GatheringHome/dummy-gathering'
import { getFormattedDate2 } from '../../util/date'
import Icon from 'react-native-vector-icons/MaterialIcons' // MaterialIcons 아이콘 사용
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

type RootStackParamList = {
  RecentGathering: undefined
  GatheringLocationSearch: undefined
  GatheringRegister: undefined
  GatheringDetail: { gatheringId: string }
}

interface GatheringDetailScreenProps {
  route: RouteProp<RootStackParamList, 'GatheringDetail'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'GatheringDetail'>
}

interface CommentData {
  id: string
  user: string
  comment: string
  likes: number
}

const GatheringDetailScreen: React.FC<GatheringDetailScreenProps> = ({
  route,
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '', // 가운데 타이틀
      headerRight: () => (
        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => console.log('Search pressed')}
          >
            <Icon name="search" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Notifications pressed')}
          >
            <Icon name="notifications-none" size={24} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  const gatheringId = route.params.gatheringId

  const selectedGathering = Gatherings.find(
    (gathering) => gathering.id === gatheringId,
  )

  if (!selectedGathering) {
    return (
      <View>
        <Text>모임을 찾을 수 없습니다.</Text>
      </View>
    )
  }

  const dummyDetailInfo = [
    { icon: 'place', text: '일본 : 오사카, 유니버셜스튜디오', color: 'orange' },
    { icon: 'people', text: '총 3명', color: 'black' },
    { icon: 'man', text: '남자 희망, 20대 중반', color: 'black' },
    {
      icon: 'money',
      text: '예상금액: 60만원(유니버설, 항공권 예매 미포함)',
      color: 'black',
    },
  ]

  const commentsData: CommentData[] = [
    { id: '1', user: '해덕해덕', comment: '저요저요죠요', likes: 25 },
    { id: '2', user: '윙레비요우사', comment: '저요죠나요요요', likes: 25 },
  ]

  const renderComment = ({ item }: { item: CommentData }) => (
    <View style={styles.comment}>
      <Text style={styles.commentUser}>{item.user}</Text>
      <Text>{item.comment}</Text>
      <View style={styles.commentStats}>
        <FontAwesome name="heart" size={14} color="red" />
        <Text style={styles.likeText}>{item.likes}</Text>
      </View>
    </View>
  )

  const renderHeader = () => (
    <View style={styles.container}>
      {/* 상단 게시물 정보 */}
      <View style={styles.postHeader}>
        <View style={styles.leftHeader}>
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAeFBMVEX////+AAD/ubn/9fX/5OT/srL/xcX/vLz/2tr/qKj/4eH+lJT/6Oj/+Pj+b2/+Li7/rKz+ODj+YWH/8PD+HBz/1NT+UVH/zMz+f3/+VVX+S0v+Wlr+ExP+i4v+Rkb+JCT+o6P+QED/hIT+PT3+dXX+lpb+Kyv+aGgfaNvJAAADdUlEQVR4nO3dgVLiMBDGcQNIEUFAqEUBFe/U93/Duw7jCZNyNG2yO1v/vyfofkObNFnSqysAAAAAAAAAAAAAAAAAAFCajvNimGXZsMjHU+2LUdfP5+vHlTu2elzP8772hWkpdr/cOfvbXPvy5GWfZ/P4ctf7STfSaH0xkIPfI+1LFZI91Uyk9DTUvlwB2SwgkdIs077kxIqPwERKH4X2ZSc02TRIpLSZaF96Ku8NEym9a198EoPQB8mp2UC7gPjmrRIpzbVLiO2udSR/ZyvaRUTVX0SIxLlFh96DxlESKY21S4llFC0S5zoy2Y8ZSUdCiXfjHHTg9hlEjsQ58xOV/jZ6Jlvro0+cQfjUQruodmJM1Xx32mW1cZMkEudutAtrLvaQ883u4NNkAameD+3Smtoli8S5nXZxzaS7c0o2757npJk8a5fXRJY0EucsLufHn8Ce2moXGC7V1OSbvUlK8kic0y4xVPsl6cusLVq/CGTyol1kmKFAJM7Z2l+/F8nkXrvMEEuRSJxbahca4FUoE0vDcdpp/bcn7ULr6wtF4pydjreeWCZ2XnrSrMJWsbMyKxaJnfl9/G2u86xsgMk9TpzraRdb061gJrfaxdYkM7E/sDK9b9fMF2amXWw9U8FIrMzaJqKZ2OgmjtuXdImNvqVCNBMbvfipN3ZO2XjjuRbN5Fq73FrS7+wcs7F4L5uJjaU2MvHxPPEx7vhk9ru+2Nj3ykUzsfF/dd53fLwXV2D9xMc6m4/1WJ/kur2N6YnswGNj2LliH7AK+8U+uQeKlW1AudYt5wz9NfBBKJIH7UIDSHQMl2wsPB7Q91iB/lgffdQV6Lf38b+MCgKZaJcYLH17+at2ieGSZ6JdYAOpX3rsvOoc2SeNZK9dXiNp+5Vs9Cd5OK+gAuda+Dj/pALn5FTgPKUKnLvlS/DXQPPns3GOe6zAuaAVYv5SOvErKU1inSO0MrNlftl0HyWSvZFGrZrqfknlf9baRcTWvrvaRsd0kEnL7yB06FFypE2fm5W+tWCDpv0GDx2Yu541bDIqb43tgQa7Xl0O4cSqg89WT28fkMizyS2LBmp/923dkbebeoaXV+A+f8pP5EixO78It1h3/bl61rKYv21O53KzzdsP/t7oP9PlOC+yLCvy8bJbb3kAAAAAAAAAAAAAAAAAADT3BzugNrnOETdrAAAAAElFTkSuQmCC',
            }}
            style={styles.profileImage}
          />
          <View style={styles.postInfo}>
            <Text style={styles.userName}>{selectedGathering.author}</Text>
            <Text style={styles.postTime}>
              {getFormattedDate2(selectedGathering.registerDate)}
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
            size={20}
            color="orange"
            style={styles.dateIcon}
          />
          <Text style={styles.dateRange}>{selectedGathering.period}</Text>
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
              size={20}
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
          <Text style={styles.statsText}>조회수 56</Text>
          <FontAwesome name="heart" size={16} color="red" />
          <Text style={styles.statsText}>25</Text>
          <FontAwesome name="comment" size={16} color="gray" />
          <Text style={styles.statsText}>4</Text>
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

      {/* 구분선 */}
      <View style={styles.separator} />
    </View>
  )

  return (
    <>
      <FlatList
        style={styles.commentContainer}
        data={commentsData}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 16 }} // 여유 공간 추가
      />
      <TouchableOpacity style={styles.completeButton}>
        <Text style={styles.completeButtonText}>동행 요청</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff', // 전체 배경색 흰색 유지
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 양 끝으로 배치 (왼쪽에 프로필, 오른쪽에 드롭다운)
  },
  leftHeader: {
    flexDirection: 'row', // 프로필, 이름, 작성일자를 한 줄에 배치
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  dateTitleContainer: {
    marginVertical: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
  },
  dateRange: {
    color: 'orange',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  postDetails: {
    padding: 12,
    backgroundColor: '#f7f7f7', // 회색 음영 처리
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
  },
  content: {
    marginVertical: 16,
    lineHeight: 22,
  },
  statsAndButtonsContainer: {
    flexDirection: 'row', // 조회수와 버튼을 한 줄에 배치
    justifyContent: 'space-between', // 양 끝에 배치
    alignItems: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#fde7e7',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: '#f56c6c',
  },
  separator: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#fff',
  },
  comment: {
    padding: 10,
    paddingLeft: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 4,
  },
  completeButton: {
    position: 'absolute',
    bottom: 30, // 화면 아래에서 30px 위로 위치
    width: '90%', // 버튼 너비를 화면의 90%로 설정
    height: 50, // 버튼 높이 설정
    backgroundColor: '#ff6347', // 배경 색상
    borderRadius: 25, // 타원형으로 만들기 위한 borderRadius
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // 가로 중앙에 배치
  },
  completeButtonText: {
    color: '#FFFFFF', // 흰색 텍스트
    fontSize: 18, // 텍스트 크기
    fontWeight: 'bold',
  },
})

export default GatheringDetailScreen
