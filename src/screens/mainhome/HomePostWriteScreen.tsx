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
import { Block } from '@/types/HomePostDetailType'
import { ScrollView } from 'react-native-gesture-handler'

interface EditPostProps {
  postId: number
}

export default function HomePostWriteScreen() {
  const navigation = useNavigation()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState<string>('')

  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [createdAt, setCreatedAt] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  //서버에 보낼 블록 타입이 T인경우 텍스트가 타입이 IMAGE인 경우 이미지 url
  //리액트는 배열이나 객체의 직접적인 상태 변화를 감지하지 못함
  const [blocks, setBlocks] = useState<Block[]>([{ type: 'T', text: '' }])

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
    return !title.trim() || !content.length // 제목 또는 내용 중 하나라도 입력이 없으면 버튼 비활성
  }

  const uploadImage = async (index: number) => {
    // 갤러리 접근 권한
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }

    // 이미지 블록 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1, //이미지 품질 최대 설정
    })
    if (result.canceled) {
      return null // 이미지 업로드 취소한 경우
    }
    // 이미지 블록을 해당 위치에 추가
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, {
      type: 'IMAGE',
      text: result.assets[0].uri,
    }) //인자로 받은 인덱스 다음부터 시작해서 제거 요소 없이 블럭 추가
    newBlocks.splice(index + 2, 0, {
      type: 'T',
      text: '', // 이미지 아래에 빈 텍스트 블록 추가
    })
    setBlocks(newBlocks)
    setAttachedPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos]
      newPhotos[index] = result.assets[0].uri // 해당 인덱스에 이미지 삽입
      return newPhotos
    })
    console.log('블럭 업데이트', newBlocks)
  }
  // 텍스트 블록 업데이트
  const updateTextBlock = (textValue: string, index: number) => {
    setContent(textValue)
    const newBlocks = [...blocks] // 기존 블록 배열 복사
    newBlocks[index].text = textValue // 해당 인덱스의 블록 텍스트만 업데이트
    setBlocks(newBlocks) // 업데이트된 배열로 상태를 설정
    console.log('블럭 업데이트', newBlocks)
  }
  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = [...attachedPhotos]
    updatedPhotos.splice(index, 1) // 해당 인덱스의 사진 삭제
    setAttachedPhotos(updatedPhotos)
    const newBlocks = [...blocks]
    newBlocks.splice(index, 1)
    setBlocks(newBlocks)
  }

  const handleSubmit = () => {
    setContent('')
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
  const renderBlocks = () => {
    return blocks.map((block, index) => {
      if (block.type === 'T') {
        return (
          //value값을 외부에서 controll하지 않음으로써 여러 개의 글 입력을 받는게 가능해짐
          <TextInput
            style={text.contentText}
            placeholder={index === 0 ? '글을 입력해주세요' : ''}
            multiline={true}
            maxLength={2000}
            onChangeText={(text) => updateTextBlock(text, index)}
            onSubmitEditing={() => handleSubmit()}
            autoFocus={true}
          />
        )
      } else if (block.type === 'IMAGE') {
        return (
          <View key={index} style={styles.pictureContainer}>
            <Image source={{ uri: block.text }} style={styles.picture} />
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleDeletePhoto(index)}
            >
              <Image
                source={require('@/assets/home/delete.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
        )
      }
    })
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
      <View style={styles.contentContainer}>
        {/* 제목 입력 */}
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
        <View style={styles.photoUploadContainer}>
          {/* 사진 첨부 버튼 */}
          <TouchableOpacity
            style={styles.photoPreview}
            onPress={() => uploadImage(blocks.length - 1)}
          >
            <Image
              source={require('@/assets/home/pictureIcon.png')}
              style={styles.pictureIcon}
            />
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
        </View>
        <ScrollView
          style={styles.contents}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled" //스크롤시 키보드와의 상호작용 제한
        >
          {renderBlocks()}
        </ScrollView>
      </View>
    </View>
  )
}
