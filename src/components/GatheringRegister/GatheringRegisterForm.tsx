import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import CustomCalendar from '../Common/Calendar' // Import CustomCalendar component
//import { styles, text } from './Styles/schduleCalendarStyles'
import {
  styles as calStyles,
  text,
} from '@/screens/schedule/Styles/schduleCalendarStyles'
// Define the types for the route params
type RouteParams = {
  params?: {
    locationName?: string
    latitude?: number
    longitude?: number
  }
}

interface GatheringRegisterFormProps {
  onSubmit: (gatheringData: GatheringData) => void
}

export interface GatheringData {
  startDate: string
  endDate: string
  title: string
  location: string
  latitude: number
  longitude: number
  personnel: number
  gender: string
  startAge: number
  endAge: number
  cost: number
  content: string
}

const GatheringRegisterForm: React.FC<GatheringRegisterFormProps> = ({
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    title: {
      value: '',
      isValid: true,
    },
    personnel: {
      value: '',
      isValid: true,
    },
    startAge: {
      value: '',
      isValid: true,
    },
    endAge: {
      value: '',
      isValid: true,
    },
    cost: {
      value: '',
      isValid: true,
    },
    content: {
      value: '',
      isValid: true,
    },
  })

  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'params'>>()

  // Destructure location data passed through navigation
  const {
    locationName = '',
    latitude = 0.0,
    longitude = 0.0,
  } = route.params || {}

  useEffect(() => {
    const gatheringData = {
      startDate: startDate,
      endDate: endDate,
      title: inputs.title.value,
      location: locationName,
      latitude: latitude,
      longitude: longitude,
      personnel: inputs.personnel.value,
      gender: selectedGender,
      startAge: inputs.startAge.value,
      endAge: inputs.endAge.value,
      cost: inputs.cost.value,
      content: inputs.content.value,
    }

    const shouldDisable = Object.values(gatheringData).some((value) => !value)

    setIsDisabled(shouldDisable)
  }, [
    inputs,
    selectedGender,
    locationName,
    latitude,
    longitude,
    startDate,
    endDate,
  ])

  function inputChangedHandler(
    inputIdentifier:
      | 'title'
      | 'personnel'
      | 'startAge'
      | 'endAge'
      | 'cost'
      | 'content',
    enteredValue: string,
  ) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }))
  }

  function submitHandler() {
    const gatheringData: GatheringData = {
      title: inputs.title.value,
      personnel: +inputs.personnel.value,
      gender:
        selectedGender === '남자만'
          ? 'MAN'
          : selectedGender === '여자만'
            ? 'WOMAN'
            : 'null',
      startAge: +inputs.startAge.value,
      endAge: +inputs.endAge.value,
      cost: +inputs.cost.value,
      content: inputs.content.value,
      startDate: startDate,
      endDate: endDate,
      location: locationName || '오사카', // Fallback to default if not selected
      latitude: latitude || 0.0,
      longitude: longitude || 0.0,
    }

    onSubmit(gatheringData)
  }

  function navigateToLocationScreen() {
    navigation.navigate('GatheringRegisterLocationSearch')
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContent}>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="calendar-outline" size={16} color="#FF6B6B" />
            <Text style={styles.dateText}>
              {startDate && endDate ? `${startDate} ~ ${endDate}` : '날짜 선택'}
            </Text>
            <Icon name="chevron-down" size={16} color="#FF6B6B" />
          </TouchableOpacity>

          {/* Modal for Calendar */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.calendarWrapper}>
                {/* 달력 컴포넌트 */}
                <CustomCalendar
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                {/* <TouchableOpacity
          onPress={() => {
            handlePostTravelSchedule()
            navigation.navigate('SceduleSpot' as never)
          }}
          style={styles.submitContainer}
        >
          <Text style={text.buttonText}>날짜 선택하기</Text>
        </TouchableOpacity> */}
                {/* 날짜 선택 완료 버튼 */}
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[calStyles.submitContainer, { marginTop: 30 }]}
                >
                  <Text
                    style={[
                      text.confirmButtonText,
                      { color: 'white', fontWeight: 'bold' },
                    ]}
                  >
                    날짜 선택하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
          <TouchableOpacity
            style={styles.infoItem}
            onPress={navigateToLocationScreen}
          >
            <Icon name="location-outline" size={20} color="#FF6B6B" />
            <Text style={styles.locationInfoText}>
              {locationName ? locationName : '위치 정보'}
            </Text>
          </TouchableOpacity>

          {/* Personnel Info */}
          <View style={styles.infoItem}>
            <Icon name="person-outline" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.infoText}
              placeholder="인원정보"
              keyboardType="numeric"
              onChangeText={inputChangedHandler.bind(this, 'personnel')}
              value={inputs.personnel.value}
            />
            <Text> 명</Text>
          </View>

          {/* Gender Info - Radio Button */}
          <View style={styles.infoItem}>
            <Icon name="information-circle-outline" size={20} color="#C0C0C0" />
            <Text style={styles.infoText}>희망 성별</Text>
          </View>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setSelectedGender('남자만')}
            >
              <Icon
                name={
                  selectedGender === '남자만'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={20}
                color="#FF6B6B"
              />
              <Text style={styles.radioLabel}>남자만</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setSelectedGender('여자만')}
            >
              <Icon
                name={
                  selectedGender === '여자만'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={20}
                color="#FF6B6B"
              />
              <Text style={styles.radioLabel}>여자만</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setSelectedGender('상관없음')}
            >
              <Icon
                name={
                  selectedGender === '상관없음'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={20}
                color="#FF6B6B"
              />
              <Text style={styles.radioLabel}>상관없음</Text>
            </TouchableOpacity>
          </View>

          {/* Start Age Info */}
          <View style={styles.infoItem}>
            <Icon name="information-circle-outline" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.infoText}
              placeholder="최소 나이"
              keyboardType="numeric"
              onChangeText={inputChangedHandler.bind(this, 'startAge')}
              value={inputs.startAge.value}
            />
          </View>

          {/* End Age Info */}
          <View style={styles.infoItem}>
            <Icon name="information-circle-outline" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.infoText}
              placeholder="최대 나이"
              keyboardType="numeric"
              onChangeText={inputChangedHandler.bind(this, 'endAge')}
              value={inputs.endAge.value}
            />
          </View>

          {/* Expected Amount */}
          <View style={styles.infoItem}>
            <Icon name="cash-outline" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.infoText}
              placeholder="예상금액"
              keyboardType="numeric"
              onChangeText={inputChangedHandler.bind(this, 'cost')}
              value={inputs.cost.value}
            />
            <Text> 만원</Text>
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
            placeholder="내용을 입력해주세요."
            placeholderTextColor="#C0C0C0"
            multiline={true}
            onChangeText={inputChangedHandler.bind(this, 'content')}
            value={inputs.content.value}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isDisabled && styles.submitButtonDisabled]}
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
  container: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 100,
  },
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
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 배경을 어둡게 하고 흰 여백 제거
  },
  calendarWrapper: {
    backgroundColor: '#fff', // 달력과 버튼 배경 흰색
    borderRadius: 10,
    padding: 20,
    width: '90%', // 화면의 90% 너비로 설정
    alignItems: 'center', // 버튼과 달력을 중앙 정렬
  },
  confirmButton: {
    marginTop: 20, // 버튼과 달력 사이 간격
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },

  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
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
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
  locationInfoText: {
    marginLeft: 8,
    color: '#FF6B6B',
    fontSize: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    paddingBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    paddingBottom: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    height: 50,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
})
