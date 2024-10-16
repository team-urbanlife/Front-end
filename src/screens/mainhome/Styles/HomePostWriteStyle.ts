import { GlobalStyles } from '@/constants/colors'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 'auto',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    // backgroundColor: 'yellow',
  },
  setCenter: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    zIndex: 3,
  },
  leftArrow: {
    width: 35,
    height: 35,
    marginLeft: -8,
  },
  backIcon: {
    width: 22,
    height: 22,
    marginLeft: -8,
  },
  pictureIcon: {
    width: 22,
    height: 22,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 16,
    marginBottom: 300,
    // overflow: 'visible',
  },
  photoUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pictureContainer: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 391,
    height: 240,
    objectFit: 'cover',
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
    marginBottom: 20,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    paddingHorizontal: 16,
  },
  contentInput: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'top',
    padding: 10,
  },
  submitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    width: 340,
    height: 40,
    backgroundColor: GlobalStyles.colors.signature,
    marginBottom: 30,
    zIndex: 10,
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
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22.4,
    letterSpacing: 0,
    flex: 1,
    marginLeft: 45,
  },
  uploadButtonText: {
    color: '#232323',
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22.4,
    letterSpacing: -0.9,
  },
  disabledButtonText: {
    color: '#949494',
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22.4,
    letterSpacing: -0.9,
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
  submitText: {
    color: GlobalStyles.colors.white,
    fontSize: 18,
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
  },
  contentText: {
    color: '#232323',
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
