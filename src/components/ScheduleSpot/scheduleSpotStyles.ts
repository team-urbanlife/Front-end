import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { GlobalStyles } from '../../constants/colors'
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: 392,
    height: 132,
    borderRadius: 20,
    marginBottom: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomColor: GlobalStyles.colors.moreFaintGray,
    borderBottomWidth: 1,
  },
  pictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '23%',
  },
  picture: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },
  middleContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    width: 170,
    height: '100%',
    justifyContent: 'center',
  },
  rightContainer: {
    paddingHorizontal: 15,
    width: 284,
    height: 112,
    paddingTop: 85,
  },
  bookmarkIcon: {
    width: 7,
    height: 12,
    marginRight: 10,
  },
  spotContainer: {
    marginTop: 10,
    paddingBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.gray,
    borderRadius: 100,
    width: 95,
    height: 32,
  },
  InputContainer: {
    position: 'absolute',
    top: 364,
    width: '92.2%',
    height: 179,
    borderRadius: 8,
    borderWidth: 1,
    padding: 13,
  },
  InputStyles: {
    width: '100%',
    color: color.normal,
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontFamily: 'Pretendard',
  },
})

export const text = {
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  buttonText: {
    color: GlobalStyles.colors.signature,
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 0,
  },
  titleText: {
    color: GlobalStyles.colors.normalDark,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '600',
  },
  hashtagText: {
    color: GlobalStyles.colors.faintGray,
    textAlign: 'left',
    fontSize: 12,
  },
} as {
  [key: string]: StyleProp<TextStyle>
}
