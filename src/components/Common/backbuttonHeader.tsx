import { View, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles/backbuttonHeaderStyles'
import { useNavigation } from '@react-navigation/native'

export default function BackButtonHeader() {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Image style={styles.backIcon} source={require('@/assets/back.png')} />
      </TouchableOpacity>
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
