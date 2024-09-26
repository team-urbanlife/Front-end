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
  unclickContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: 67,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  clickContainer: {
    backgroundColor: 'rgba(240, 127, 89, 0.3)',
    flexDirection: 'row',
    width: '100%',
    height: 67,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '23%',
  },
  picture: {
    width: 32,
    height: 42,
    marginHorizontal: 16,
  },
  middleContainer: {
    width: 342,
    height: '100%',
    justifyContent: 'center',
  },
  bookmarkIcon: {
    width: 7,
    height: 12,
    marginRight: 10,
  },
  spotContainer: {
    paddingBottom: 5,
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
  inputPositionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50,
  },
  InputContainer: {
    width: 342,
    height: 39,
    backgroundColor: GlobalStyles.colors.moreFaintGray,
    color: GlobalStyles.colors.normalDark,
    borderTopLeftRadius: 0, // 왼쪽 상단 굴곡 없음
    borderTopRightRadius: 24, // 나머지 굴곡 유지
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputStyles: {
    width: 300,
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.5,
    paddingHorizontal: 19,
    fontFamily: 'Pretendard',
    textAlignVertical: 'center',
  },
  pencilIcon: {
    width: 14,
    height: 14,
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
