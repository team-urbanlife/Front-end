import { View, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles/logoHeaderStyle'
import { useNavigation } from '@react-navigation/native'

export default function LogoHeader() {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <Image style={styles.Logo} source={require('@/assets/logo.png')} />
      <View style={styles.searchNotiContainer}>
        <TouchableOpacity
          onPress={() => {
            //navigation.navigate('' as never)
          }}
        >
          <Image style={styles.searchNotiIcon} />
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
  )
}
