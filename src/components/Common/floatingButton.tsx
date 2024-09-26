import { View, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles/floatingButtonStyles'
import { useNavigation } from '@react-navigation/native'

interface FloatingButtonProps {
  route: string
}
export default function FloatingButton({ route }: FloatingButtonProps) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(route as never)
      }}
      style={styles.position}
    >
      <Image
        source={require('@/assets/schedule/plus.png')}
        style={styles.Icon}
      />
    </TouchableOpacity>
  )
}
