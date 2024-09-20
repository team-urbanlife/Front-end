import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Calendar } from 'react-native-calendars'

interface DayObject {
  dateString: string
  day: number
  month: number
  year: number
  timestamp: number
}

interface DateSelectionModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: (startDate: string | null, endDate: string) => void
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null,
  )
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null)
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false)
  const [currentYear, setCurrentYear] = useState(2024)
  const [currentMonth, setCurrentMonth] = useState(9) // 현재 월 (9월)

  // 월 선택을 위한 배열 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  function onDayPress(day: DayObject) {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString)
      setSelectedEndDate(null)
    } else {
      setSelectedEndDate(day.dateString)
    }
  }

  function handleConfirm() {
    if (selectedStartDate && selectedEndDate) {
      onConfirm(selectedStartDate, selectedEndDate)
      onClose()
    } else {
      alert('여행 시작일과 종료일을 모두 선택해주세요.')
    }
  }

  function handleMonthSelect(month: number) {
    setCurrentMonth(month)
    setIsMonthPickerVisible(false) // 월 선택 후 모달 닫기
  }

  // 사용자 정의 요일 렌더링
  function renderDayNames() {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return (
      <View style={styles.weekDaysContainer}>
        {days.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>
    )
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* 월 선택 모달 */}
          <Modal
            visible={isMonthPickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.monthPickerModal}>
              <ScrollView>
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={styles.monthOption}
                    onPress={() => handleMonthSelect(month)}
                  >
                    <Text style={styles.monthPickerText}>
                      {currentYear}/{month < 10 ? `0${month}` : month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>

          {/* 캘린더 상단 */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.monthSelector}
              onPress={() => setIsMonthPickerVisible(true)}
            >
              <Text style={styles.monthText}>
                {currentYear}/
                {currentMonth < 10 ? `0${currentMonth}` : currentMonth}
              </Text>
            </TouchableOpacity>
            <Text style={styles.todayText}>
              Today: {new Date().toLocaleDateString()}
            </Text>
          </View>

          {/* 한글 요일 표시 */}
          {renderDayNames()}

          {/* 캘린더 */}
          <Calendar
            current={`${currentYear}-${currentMonth < 10 ? `0${currentMonth}` : currentMonth}-01`}
            onDayPress={onDayPress}
            hideExtraDays={true} // 불필요한 날짜 숨김
            monthFormat={''} // 월과 연도를 제거
            markedDates={{
              [selectedStartDate || '']: {
                selected: true,
                startingDay: true,
                color: '#FF6B6B',
              },
              [selectedEndDate || '']: {
                selected: true,
                endingDay: true,
                color: '#FF6B6B',
              },
            }}
            markingType={'period'}
            theme={{
              selectedDayBackgroundColor: '#FF6B6B',
              todayTextColor: '#FF6B6B',
              arrowColor: '#FF6B6B',
              textDayFontWeight: 'bold',
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16,
            }}
            style={styles.calendarStyle}
            renderHeader={() => null} // 상단 헤더 제거
            dayHeaderStyle={{ display: 'none' }} // 기존 요일 텍스트를 숨김
          />

          {/* 선택된 날짜 */}
          <Text style={styles.selectedDatesText}>
            {selectedStartDate && selectedEndDate
              ? `선택한 날짜: ${selectedStartDate} ~ ${selectedEndDate}`
              : '여행 시작일과 종료일을 선택해주세요'}
          </Text>

          {/* 날짜 선택 버튼 */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>날짜 선택하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default DateSelectionModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthSelector: {
    borderColor: '#FF6B6B',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  monthText: {
    color: '#FF6B6B',
    fontSize: 18,
  },
  todayText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  calendarStyle: {
    marginBottom: 10,
    borderRadius: 10,
  },
  selectedDatesText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF6B6B',
    marginVertical: 15,
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  monthPickerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  monthOption: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
  },
  monthPickerText: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  weekDayText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
