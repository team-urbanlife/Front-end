import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import { styles, text } from './Styles/ScheduleHomeStyles'
import ScheduleHomeComponent from '@/components/ScheduleHome/scheduleHomeComponent'
import ScheduleDetailType from '@/types/ScheduleDetailType'
import AppleMap from './map'

export default function ScheduleHome() {
  //const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <AppleMap />
    </View>
  )
}
