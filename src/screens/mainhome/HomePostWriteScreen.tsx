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
import axios from 'axios'
import { storePost } from './HomePostHttp'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../App'
import { useSchedule } from '@/context/ScheduleProvide'

interface EditPostProps {
  postId: number
}

export default function HomePostWriteScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState<string>('')
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [createdAt, setCreatedAt] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  const [blocks, setBlocks] = useState<Block[]>([{ type: 'T', text: '' }])

  const { writeDone, setWriteDone } = useSchedule()

  const handleLeftArrowPress = () => {
    navigation.goBack()
  }

  const isUploadButtonDisabled = () => {
    return !title.trim() || !content.length
  }

  const uploadImage = async (index: number) => {
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1, // 이미지 품질 최대 설정
    })

    // 이미지 업로드가 취소되거나 assets가 없는 경우 예외 처리
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null
    }

    try {
      const formData = new FormData()

      // 이미지가 있는 경우에만 uri 사용, 타입에 맞게 처리
      formData.append('files', {
        uri: result.assets[0].uri, // 이미지 URI
        type: 'image/jpeg', // 이미지 타입
        name: 'image.jpg', // 서버에 전달될 파일 이름
      } as any) // TypeScript가 오류를 발생시키지 않도록 any 타입으로 처리

      formData.append('dirName', 'post') // 예시로 'post' 디렉토리명

      const response = await axios.post(
        'https://dev.wegotoo.net/v1/s3',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      )

      const serverImagePath = response.data.data[0]
      const newBlocks = [...blocks]
      newBlocks.splice(index + 1, 0, { type: 'IMAGE', text: serverImagePath })
      newBlocks.splice(index + 2, 0, { type: 'T', text: '' })
      setBlocks(newBlocks)

      setAttachedPhotos((prevPhotos) => [...prevPhotos, serverImagePath])
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error)
    }
  }

  const updateTextBlock = (textValue: string, index: number) => {
    setContent(textValue)
    const newBlocks = [...blocks]
    newBlocks[index].text = textValue
    setBlocks(newBlocks)
  }

  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = [...attachedPhotos]
    updatedPhotos.splice(index, 1)
    setAttachedPhotos(updatedPhotos)

    const newBlocks = [...blocks]
    newBlocks.splice(index, 1)
    setBlocks(newBlocks)
  }

  const renderBlocks = () => {
    return blocks.map((block, index) => {
      if (block.type === 'T') {
        return (
          <TextInput
            key={`text-${index}`} // 고유한 key 추가
            style={text.contentText}
            placeholder={index === 0 ? '글을 입력해주세요' : ''}
            multiline={true}
            maxLength={2000}
            onChangeText={(text) => updateTextBlock(text, index)}
            autoFocus={true}
          />
        )
      } else if (block.type === 'IMAGE') {
        return (
          <View key={index.toString()} style={styles.pictureContainer}>
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

  // 작성완료 버튼 핸들러
  const handleComplete = async () => {
    // blocks 배열을 aaa 함수에 전달하여 서버로 전송

    const postData = {
      title: title,
      contents: blocks,
    }
    setWriteDone(!writeDone)
    console.log('postData확인', postData)
    const id = await storePost(postData)
    console.log('postId여기서도 확인되?', id)
    // 게시가 완료되면 홈으로 이동
    //navigation.navigate('WeGoTooOverview' as never)
    navigation.replace('HomePostScreen', { postId: id })
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
          disabled={isUploadButtonDisabled()}
          onPress={handleComplete} // 작성완료 버튼 핸들러 연결
        >
          <Text style={text.uploadButtonText}>작성완료</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
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
                { color: attachedPhotos.length > 0 ? '#52A55D' : '#555' },
              ]}
            >
              {`${attachedPhotos.length}/20`}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.contents}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {renderBlocks()}
          {/* {content && (
            <View style={styles.setCenter}>
              <TouchableOpacity style={styles.submitContainer}>
                <Text style={text.submitText}>게시하기</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </ScrollView>
      </View>
    </View>
  )
}
