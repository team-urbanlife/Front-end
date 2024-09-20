import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons' // 아이콘 사용을 위한 패키지
import DateSelectionModal from './DateSelectionModal'
import Gathering from '../../components/GatheringHome/gatheringclass'

interface GatheringRegisterFormProps {
  onSubmit: (gatheringData: Gathering) => void
}

export interface GatheringData {
  title: string
  period: string
  content: string
}

interface SelectedDates {
  start: string | null // 수정된 타입
  end: string
}

const GatheringRegisterForm: React.FC<GatheringRegisterFormProps> = ({
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    title: {
      value: '',
      isValid: true,
    },
    period: {
      value: '',
      isValid: true,
    },
    content: {
      value: '',
      isValid: true,
    },
  })

  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const gatheringData = {
      title: inputs.title.value,
      period: inputs.period.value,
      content: inputs.content.value,
    }
    const shouldDisable =
      !gatheringData.title.trim() || !gatheringData.content.trim() // 필수값이 없으면 비활성화

    setIsDisabled(shouldDisable)
  }, [inputs])

  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedDates, setSelectedDates] = useState<SelectedDates | null>(null)

  function handleDateSelection(start: string | null, end: string) {
    setSelectedDates({ start, end })
  }

  function inputChangedHandler(
    inputIdentifier: 'title' | 'period' | 'content',
    enteredValue: string,
  ) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }))
  }

  function submitHandler() {
    const gatheringData: Gathering = {
      title: inputs.title.value,
      period: inputs.period.value,
      content: inputs.content.value,
      id: '',
      registerDate: new Date(),
    }

    const titleIsValid = !!gatheringData.title
    const periodIsValid = !!gatheringData.period
    const contentIsValid = !!gatheringData.content

    if (!titleIsValid || !periodIsValid || !contentIsValid) {
      setInputs((curInputs) => ({
        title: { value: curInputs.title.value, isValid: titleIsValid },
        period: { value: curInputs.period.value, isValid: periodIsValid },
        content: { value: curInputs.content.value, isValid: contentIsValid },
      }))
      return
    }

    onSubmit(gatheringData)
  }

  return (
    <View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="calendar-outline" size={16} color="#FF6B6B" />
          <Text style={styles.dateText}>
            {selectedDates
              ? `${selectedDates.start} ~ ${selectedDates.end}`
              : '날짜 선택'}
          </Text>
          <Icon name="chevron-down" size={16} color="#FF6B6B" />
        </TouchableOpacity>

        <DateSelectionModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleDateSelection}
        />
      </View>

      {/* Title Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !inputs.title.isValid && styles.invalidInput]}
          placeholder="제목을 입력해주세요"
          placeholderTextColor="#C0C0C0"
          onChangeText={inputChangedHandler.bind(this, 'title')}
          value={inputs.title.value}
        />
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <View style={styles.formSectionHeader}>
          <Text style={styles.sectionTitle}>모집 정보를 적어주세요</Text>
          <Text style={styles.sectionRequired}>
            *위치정보는 필수 기입란입니다
          </Text>
        </View>

        {/* Location Info */}
        <View style={styles.infoItem}>
          <Icon name="location-outline" size={20} color="#FF6B6B" />
          <Text style={styles.infoText}>위치 정보</Text>
        </View>

        {/* Personnel Info */}
        <View style={styles.infoItem}>
          <Icon name="person-outline" size={20} color="#C0C0C0" />
          <Text style={styles.infoText}>인원정보</Text>
        </View>

        {/* Gender and Age */}
        <View style={styles.infoItem}>
          <Icon name="information-circle-outline" size={20} color="#C0C0C0" />
          <Text style={styles.infoText}>희망 성별, 나이</Text>
        </View>

        {/* Expected Amount */}
        <View style={styles.infoItem}>
          <Icon name="cash-outline" size={20} color="#C0C0C0" />
          <Text style={styles.infoText}>
            예상 금액을 최대한 구체적으로 적어주세요
          </Text>
        </View>
      </View>

      {/* Content Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            styles.inputMultiline,
            !inputs.content.isValid && styles.invalidInput,
          ]}
          placeholder="내용을 입력해주세요. 커뮤니티 이용 규칙에 의해 부적절한 게시물은 숨김, 삭제 처리될 수 있습니다."
          placeholderTextColor="#C0C0C0"
          multiline={true}
          onChangeText={inputChangedHandler.bind(this, 'content')}
          value={inputs.content.value}
        />
      </View>

      {/* Add Map Button */}
      <TouchableOpacity style={styles.mapButton}>
        <Text style={styles.mapButtonText}>+ 지도 추가(선택)</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isDisabled && styles.submitButtonDisabled]} // 비활성화 시 스타일 변경
        disabled={isDisabled}
        onPress={submitHandler}
      >
        <Text style={styles.submitButtonText}>작성 완료</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GatheringRegisterForm

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6B6B',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  dateText: {
    marginHorizontal: 8,
    color: '#FF6B6B',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    padding: 8,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidInput: {
    borderBottomColor: 'red',
  },
  formSection: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  formSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#C0C0C0',
  },
  sectionRequired: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    color: '#333',
  },
  mapButton: {
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#C0C0C0',
  },
  submitButton: {
    backgroundColor: '#ff6347',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
})
