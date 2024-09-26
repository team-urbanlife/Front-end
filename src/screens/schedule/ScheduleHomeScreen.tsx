import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './Styles/ScheduleHomeStyles'
import ScheduleHomeComponent from '@/components/ScheduleHome/scheduleHomeComponent'
import ScheduleDetailType from '@/types/ScheduleDetailType'
import FloatingButton from '@/components/Common/floatingButton'

// ScheduleDetail 객체 배열 예시
const schedules: ScheduleDetailType[] = [
  {
    id: '1',
    title: '파리 투어',
    imageUrl: '../../assets/travel.png',
    startTime: '9.12',
    endTime: '9.14',
    location: 'Paris, France',
    totalPeople: 2,
    createdAt: new Date('2024-09-01T09:00:00'),
    updatedAt: new Date('2024-09-15T09:00:00'),
  },
  {
    id: '2',
    title: '도쿄 미식 여행',
    imageUrl: '../../assets/travel.png',
    startTime: '9.12',
    endTime: '9.14',
    location: 'Tokyo, Japan',
    totalPeople: 3,
    createdAt: new Date('2024-09-10T11:00:00'),
  },
  {
    id: '3',
    title: '뉴욕 시티 투어',
    imageUrl: '../../assets/travel.png',
    startTime: '9.12',
    endTime: '9.14',
    location: 'New York, USA',
    createdAt: new Date('2024-09-12T13:00:00'),
    updatedAt: new Date('2024-09-14T09:00:00'),
  },
  {
    id: '4',
    title: '뉴욕 시티 투어',
    imageUrl: '../../assets/travel.png',
    startTime: '9.12',
    endTime: '9.14',
    location: 'New York, USA',
    createdAt: new Date('2024-09-12T13:00:00'),
    updatedAt: new Date('2024-09-14T09:00:00'),
  },
]

export default function ScheduleHome() {
  //const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Image style={styles.Logo} source={require('@/assets/logo.png')} />
        <View style={styles.searchNotiContainer}>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('' as never)
            }}
          >
            <Image
              source={require('@/assets/schedule/search.png')}
              style={styles.searchNotiIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('' as never)
            }}
          >
            <Image
              source={require('@/assets/notification.png')}
              style={styles.searchNotiIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* 상단부*/}
      <View style={styles.textContainer}>
        <Text style={text.titleText}>예정된 여행 일정</Text>
        <Text style={text.subtitleText}>
          어떤 여행이 나를 기다리고 있을까요?
        </Text>
      </View>
      {/*여행 일정 컴포넌트 */}
      <ScrollView style={styles.schedulesContainer}>
        {schedules &&
          schedules.map((schedule, index) => (
            <View key={index}>
              <ScheduleHomeComponent
                startTime={schedule.startTime}
                endTime={schedule.endTime}
                title={schedule.title}
                imageUrl={schedule.imageUrl}
                totalPeople={schedule.totalPeople}
                id={schedule.id}
                createdAt={schedule.createdAt}
              />
            </View>
          ))}
      </ScrollView>
      <FloatingButton route="SceduleSpot" />
    </View>
  )
}
