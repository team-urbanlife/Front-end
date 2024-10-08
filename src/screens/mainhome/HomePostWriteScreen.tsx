import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  Modal,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './Styles/HomePostWriteStyle'
import * as ImagePicker from 'expo-image-picker'

interface EditPostProps {
  postId: number
}

export default function HomePostWriteScreen() {
  const navigation = useNavigation()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [createdAt, setCreatedAt] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {}, [])

  const handleLeftArrowPress = () => {
    navigation.goBack()
    // setShowAlert(true)
  }

  const handleCancel = () => {
    setShowAlert(false)
    navigation.navigate('PostDetail' as never)
  }

  const handleContinue = () => {
    setShowAlert(false)
  }

  const isUploadButtonDisabled = () => {
    return !title.trim() || !content.trim() // 제목 또는 내용 중 하나라도 입력이 없으면 버튼 비활성
  }

  const uploadImage = async () => {
    // 갤러리 접근 권한
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    })
    if (result.canceled) {
      return null // 이미지 업로드 취소한 경우
    }
    // 이미지 업로드 결과 및 이미지 경로 업데이트
    setAttachedPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri])
  }

  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = [...attachedPhotos]
    updatedPhotos.splice(index, 1) // 해당 인덱스의 사진 삭제
    setAttachedPhotos(updatedPhotos)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category) // 선택된 카테고리 상태 업데이트
  }

  const handleAnonymousClick = () => {
    setIsAnonymous((prev) => !prev)
  }

  //   const handlePostInfo = async () => {
  //     try {
  //       const postInfo = {
  //         postId: postId,
  //         category_name: selectedCategory,
  //         title: title,
  //         nickname: userStore.nickname,
  //         content: content,
  //         images: attachedPhotos.join(','),
  //         anonymous: isAnonymous,
  //       }
  //       await updatePostApi(postInfo, postId)
  //       console.log('PostInfo sent successfully:', postInfo)
  //     } catch (error) {
  //       console.error('Error sending PostInfo:', error)
  //     }
  //   }

  const handleUploadButton = () => {
    //handlePostInfo()
    navigation.navigate('Home' as never)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLeftArrowPress}>
          <Image
            source={require('@/assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={text.titleText}>여행 후기 작성</Text>
        <TouchableOpacity
          style={[styles.uploadButton]}
          disabled={isUploadButtonDisabled()} // 버튼 비활성 상태 설정
          onPress={handleUploadButton}
        >
          <View style={styles.leftArrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.contents}>
        {/* 사진 첨부 */}
        <View style={styles.photoUploadContainer}>
          {/* 사진 첨부 버튼 */}
          <TouchableOpacity style={styles.photoPreview} onPress={uploadImage}>
            <Image />
            <Text
              style={[
                text.photoPreviewText,
                {
                  color: attachedPhotos.length > 0 ? '#52A55D' : '#555',
                },
              ]}
            >
              {`${attachedPhotos.length}/20`}
            </Text>
          </TouchableOpacity>
          {/* 첨부된 사진 미리보기 */}
          {attachedPhotos.map((photoUri, index) => (
            <View key={index} style={styles.photoPreview}>
              <Image
                source={{ uri: photoUri }}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                  borderRadius: 12,
                }}
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleDeletePhoto(index)}
              >
                <Image />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 게시글 입력 */}
        <View style={styles.titleContainer}>
          <TextInput
            style={text.contentTitleText}
            maxLength={50}
            value={title}
            onChangeText={setTitle}
            placeholder={'제목을 입력해주세요'}
          />
          <View style={styles.titleBar} />
        </View>

        <View style={styles.contentContainer}>
          <TextInput
            style={text.contentText}
            placeholder={'글을 입력해주세요'}
            multiline
            maxLength={2000}
            value={content}
            onChangeText={setContent}
          />
        </View>
      </View>

      {/* 익명 체크 */}
      <View style={styles.anonymousContainer}>
        <TouchableOpacity
          style={styles.anonymousCheckbox}
          onPress={handleAnonymousClick}
        >
          <Image
            source={
              isAnonymous
                ? require('@/assets/back.png')
                : require('@/assets/arrow.png')
            }
            style={styles.checkboxIcon}
          />
          <Text
            style={[
              text.anonymousText,
              { color: isAnonymous ? '#52A55D' : '#949494' },
            ]}
          >
            익명
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
