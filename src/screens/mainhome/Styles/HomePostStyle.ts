import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { GlobalStyles } from '@/constants/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  picture: {
    width: 391,
    height: 240,
    objectFit: 'cover',
  },
  WritterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 'auto',
    paddingLeft: 25,
  },
  contentContainer: {
    flexDirection: 'column',
    height: 'auto',
    paddingHorizontal: 20,
    marginTop: 26,
  },
  pictureContainer: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 100,
    objectFit: 'cover',
  },
  profileImageContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 140,
    left: 317,
    borderRadius: 100,
    backgroundColor: GlobalStyles.colors.white,
  },
  titleContainer: {
    paddingTop: 23,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foraRibbonIcon: {
    width: 14,
    height: 11,
    marginRight: 4,
  },
  schedulesContainer: {
    position: 'absolute',
    top: 211,
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
  titleBar: {
    width: '100%',
    height: 0,
    marginTop: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#232323',
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
  titleText: {
    color: GlobalStyles.colors.normalDark,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 22,
    fontWeight: 'bold',
  },
  nameText: {
    color: GlobalStyles.colors.normalDark,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 17,
  },
  createdAtText: {
    color: GlobalStyles.colors.faintGray,
    fontSize: 13,
  },
  contentText: {
    color: GlobalStyles.colors.darkGray,
    fontSize: 14,
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
