import { GlobalStyles } from '@/constants/colors'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  setCenter: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLine: {
    width: 138,
    height: 5,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.moreFaintGray,
  },
  flexRow: {
    flexDirection: 'row',
    marginHorizontal: 3,
  },
  arrowIcon: {
    width: 10,
    height: 20,
    marginLeft: 2,
    objectFit: 'contain',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 389,
    height: 38,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: GlobalStyles.colors.faintGray,
  },
  contentContainer: {
    position: 'absolute',
    top: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginHorizontal: 8,
    width: 398,
  },
  businessInfoContainer: {
    position: 'absolute',
    bottom: 50,
    left: 38,
  },
})

// 공통 스타일 정의
const baseText = {
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: '400',
}

// 공통 스타일을 확장하여 개별 스타일 정의
export const text = {
  dayText: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.darkGray,
    fontSize: 14,
  },
  clickText: {
    color: GlobalStyles.colors.signature,
    fontSize: 14,
    fontWeight: 'bold',
  },
  unclickText: {
    color: GlobalStyles.colors.faintGray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  editText: {
    color: GlobalStyles.colors.faintGray,
    fontSize: 14,
  },
  buttonText: {
    color: GlobalStyles.colors.faintGray,
    fontSize: 13,
    lineHeight: 19.6,
    letterSpacing: -0.7,
  },
  viewContentText: {
    ...baseText,
    color: '#52A55D',
    fontSize: 14,
    lineHeight: 19.6,
    letterSpacing: -0.7,
    textDecorationLine: 'underline',
  },
  businessInfoText: {
    ...baseText,
    color: '#949494',
    textAlign: 'center',
  },
} as {
  [key: string]: StyleProp<TextStyle>
}
