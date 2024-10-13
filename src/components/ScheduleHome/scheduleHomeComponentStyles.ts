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
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 위치 (x, y)
    shadowOpacity: 0.1, // 그림자 투명도
    shadowRadius: 10, // 그림자 반경
    marginBottom: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  picture: {
    width: 108,
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    width: 284,
    height: 112,
    paddingBottom: 10,
  },
  IconImage: {
    width: 9,
    height: 8,
  },
  scheduleContainer: {
    paddingTop: 10,
  },
  bottomContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
  },
  searchNotiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 61,
    height: 'auto',
  },
  searchNotiIcon: {
    width: 23,
    height: 23,
  },
  textContainer: {
    flexDirection: 'column',
    width: 61,
    height: 'auto',
  },
  greenLine: {
    width: '50%',
    height: 2,
    backgroundColor: color.primary,
  },
  grayLine: {
    width: '50%',
    height: 1,
    backgroundColor: color.faintGray,
  },
  hospitalContainer: {
    paddingTop: 33,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middleContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 30,
    borderTopColor: color.faintGray,
    borderTopWidth: 1,
  },
  grayButton: {
    width: 48,
    height: 24,
    borderRadius: 500,
    backgroundColor: color.faintGray,
    marginLeft: 6,
  },
  foraRibbonIcon: {
    width: 14,
    height: 11,
    marginRight: 4,
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
  uploadButton: {
    width: 100,
    height: 35,
    marginRight: -25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 360,
    left: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐림 효과를 위한 반투명 배경
  },
  contents: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  photoUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 543,
  },
  photoPreview: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  categoryButton: {
    display: 'flex',
    width: 70,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    backgroundColor: '#EEE',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#52A55D',
  },
  titleContainer: {
    width: '99%',
    height: 48,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 12,
  },
  titleBar: {
    width: '100%',
    height: 0,
    marginTop: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#232323',
  },
  contentContainer: {
    width: '99%',
    height: 459,
    marginBottom: 20,
  },
  contentInput: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'top',
    padding: 10,
  },
  anonymousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
    justifyContent: 'flex-end',
  },
  anonymousCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
})

export const text = {
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  scheduleText: {
    color: GlobalStyles.colors.signature,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 27,
  },
  titleText: {
    color: GlobalStyles.colors.normalDark,
    textAlign: 'left',
    lineHeight: 19,
    fontSize: 15,
    fontWeight: '600',
    textAlignVertical: 'top',
  },
  bottomText: {
    color: GlobalStyles.colors.faintGray,
    textAlign: 'center',
    fontSize: 13,
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
  photoPreviewText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    letterSpacing: -0.7,
  },
  categoryButtonText: {
    color: '#232323',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22.4,
    letterSpacing: -0.8,
  },
  selectedCategoryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
    letterSpacing: -0.8,
  },
  contentTitleText: {
    marginTop: 13,
    color: '#949494',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  contentText: {
    color: '#949494',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: -0.9,
  },
  anonymousText: {
    color: '#949494',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    letterSpacing: -0.7,
  },
} as {
  [key: string]: StyleProp<TextStyle>
}
