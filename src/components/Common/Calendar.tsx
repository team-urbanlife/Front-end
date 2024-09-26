import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { styles } from './styles/calendarStyles'
import { GlobalStyles } from '@/constants/colors'

type DayType = {
  day: number
  month: number
  year: number
  timestamp: number
  dateString: string
}
export default function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState('2024-09-11')
  //오늘 날짜
  const currentDate = new Date().toISOString().split('T')[0]
  const month = currentDate.split('-')[1]
  const day = currentDate.split('-')[2]
  const handleDayPress = (day: DayType) => {
    setSelectedDate(day.dateString)
  }
  return (
    <View style={styles.container}>
      {/* 상단 날짜 및 선택 날짜 */}
      <View style={styles.header}>
        <Text style={styles.headerDate}>{'Today: ' + month + '/' + day}</Text>
        <Text style={styles.selectedDate}>선택한 날짜: {selectedDate}</Text>
      </View>

      {/* 달력 */}
      <Calendar
        current={'2024-09-01'}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: GlobalStyles.colors.signature,
          },
          '2024-09-02': {
            marked: true,
            dotColor: GlobalStyles.colors.signature,
          },
        }}
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: GlobalStyles.colors.white,
          calendarBackground: GlobalStyles.colors.white,
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: GlobalStyles.colors.signature,
          selectedDayTextColor: GlobalStyles.colors.white,
          todayTextColor: GlobalStyles.colors.signature,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: GlobalStyles.colors.signature,
          monthTextColor: GlobalStyles.colors.signature,
        }}
      />
    </View>
  )
}
