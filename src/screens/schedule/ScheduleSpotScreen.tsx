import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
} from 'react-native'
import { styles, text } from './Styles/ScheduleSpotStyles'
import ScheduleSpotComponent from '@/components/ScheduleSpot/scheduleSpotComponent'
import ScheduleDetailType from '@/types/ScheduleDetailType'

const regions = [
  {
    name: 'Seoul',
    hashtags: ['#seoul', '#koreanculture', '#citylife'],
    imageUrl: '',
  },
  {
    name: 'New York',
    hashtags: ['#newyork', '#bigapple', '#citythatneversleeps'],
    imageUrl: '',
  },
  {
    name: 'Paris',
    hashtags: ['#paris', '#cityoflove', '#eiffeltower'],
    imageUrl: '',
  },
  {
    name: 'Tokyo',
    hashtags: ['#tokyo', '#technology', '#sushilife'],
    imageUrl: '',
  },
  {
    name: 'London',
    hashtags: ['#london', '#history', '#royalpalace'],
    imageUrl: '',
  },
]

const touristSpots = [
  {
    name: 'Eiffel Tower',
    hashtags: ['#eiffeltower', '#paris', '#frenchlandmark'],
    imageUrl: '',
  },
  {
    name: 'Statue of Liberty',
    hashtags: ['#statueofliberty', '#newyork', '#landmark'],
    imageUrl: '',
  },
  {
    name: 'Mount Fuji',
    hashtags: ['#mountfuji', '#japan', '#fujisan'],
    imageUrl: '',
  },
  {
    name: 'Buckingham Palace',
    hashtags: ['#buckinghampalace', '#london', '#royalfamily'],
    imageUrl: '',
  },
  {
    name: 'Namsan Tower',
    hashtags: ['#namsantower', '#seoul', '#korea'],
    imageUrl: '',
  },
]

export default function ScheduleSpot() {
  //const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <View style={styles.header}>
        <Image style={styles.Logo} source={require('@/assets/back.png')} />
        <View style={styles.searchNotiContainer}>
          <TextInput />
          <Image />
        </View>
      </View>
      {/* */}
      <View style={styles.textContainer}>
        <Text style={text.titleText}>예정된 여행 일정</Text>
        <Text style={text.subtitleText}>
          어떤 여행이 나를 기다리고 있을까요?
        </Text>
      </View>
      {/*여행 일정 컴포넌트 */}
      <ScrollView style={styles.schedulesContainer}>
        {regions &&
          regions.map((region, index) => (
            <View key={index}>
              <ScheduleSpotComponent
                title={region.name}
                hashtag={region.hashtags}
                buttonName={'지역 선택'}
                id={index}
                imageUrl={region.imageUrl}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  )
}
