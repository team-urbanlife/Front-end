import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import GoogleMap from './src/screens/schedule/map'
import ScheduleHome from './src/screens/schedule/ScheduleHomeScreen'

export default function App() {
  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <ScheduleHome />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
