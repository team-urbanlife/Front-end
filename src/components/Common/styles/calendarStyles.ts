import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerDate: {
    fontSize: 16,
    color: '#FF6F61',
  },
  selectedDate: {
    fontSize: 16,
    color: '#FF6F61',
  },
})
