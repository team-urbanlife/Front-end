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
    paddingTop: 70,
    flex: 1,
    backgroundColor: '#fff',
  },
  backButtonContainier: {
    alignItems: 'center',
    marginRight: 7,
    zIndex: 3,
    width: 20,
    height: 20,
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
    marginTop: 10,
  },
  searchIconContainer: {
    alignItems: 'center',
    marginLeft: -50,
    marginTop: 5,
  },
  searchIcon: {
    width: 32,
    height: 36,
    objectFit: 'contain',
  },
  searchResultContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  currentLocationIcon: {
    width: 17.07,
    height: 23.61,
    marginRight: 10,
  },
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.gray,
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  bookmarkIcon: {
    width: 7,
    height: 12,
    objectFit: 'contain',
    marginHorizontal: 3,
  },
  nextSchedulesContainer: {
    marginTop: 50,
    flex: 1,
    height: 'auto',
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
