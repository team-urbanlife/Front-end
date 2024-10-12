import { GlobalStyles } from '@/constants/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  setCenter: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 151,
    height: 38,
    marginBottom: 10,
    backgroundColor: 'rgba(240, 127, 89, 0.3)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.signature,
  },
  headerDate: {
    fontSize: 16,
    color: '#FF6F61',
  },
  selectedDate: {
    fontSize: 16,
    color: '#FF6F61',
  },
  arrowIcon: {
    width: 12,
    height: 6,
    objectFit: 'contain',
    marginHorizontal: 6,
  },
})
