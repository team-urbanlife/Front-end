import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { GlobalStyles } from '../../../constants/colors'
const color = {
  primary: '#52A35D',
  normal: '#232323',
  inactiveBottom: '#EFEFF0',
  ribbon: '#FF5D5D',
  faintBlack: '#555555',
  backgroundGray: '#EDEDEA',
  faintGray: '#EEEEEE',
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 56,
    width: '90%',
    height: 48,
    marginBottom: 15,
  },
  IconContainer: {
    width: 22,
    height: 22,
    zIndex: 1,
    marginRight: 10,
  },
  backIcon: {
    width: 22,
    height: 22,
    marginRight: 20,
    zIndex: 1,
  },
  searchNotiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 61,
    height: 'auto',
  },
  nextContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 128,
    paddingHorizontal: 16,
  },
  regionContainer: {
    backgroundColor: 'rgba(240, 127, 89, 0.2)',
    width: 63,
    height: 32,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GlobalStyles.colors.signature,
    borderWidth: 1,
    borderRadius: 100,
  },
  InputStyles: {
    width: 360,
    height: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    zIndex: 3,
  },
  searchContainer: {
    width: 368,
    height: 50,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.moreFaintGray,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  searchIcon: {
    width: 23,
    height: 23,
    position: 'absolute',
    right: -160,
    bottom: 25,
    zIndex: 5,
  },
  textContainer: {
    flexDirection: 'column',
    width: 'auto',
    height: 200,
    paddingHorizontal: 20,
  },
  schedulesContainer: {
    position: 'absolute',
    top: 111,
  },
  nextSchedulesContainer: {
    position: 'absolute',
    top: 171,
  },
})

export const text = {
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  titleText: {
    color: GlobalStyles.colors.normalDark,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0,
    marginBottom: 7,
  },
  subtitleText: {
    color: GlobalStyles.colors.faintGray,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  chosenText: {
    color: GlobalStyles.colors.signature,
    fontSize: 19,
    fontWeight: 'bold',
  },
  regionText: {
    color: GlobalStyles.colors.signature,
    fontSize: 14,
  },
  borderText: {
    color: color.normal,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  bordernormalText: {
    color: color.normal,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  normalText: {
    color: color.normal,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22.4,
    letterSpacing: -0.5,
  },
} as {
  [key: string]: StyleProp<TextStyle>
}
