import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
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

interface CalendarProps {
  startDate: string
  endDate: string
  setStartDate: React.Dispatch<React.SetStateAction<string>>
  setEndDate: React.Dispatch<React.SetStateAction<string>>
}

export default function CustomCalendar({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}: CalendarProps) {
  // 오늘 날짜
  const currentDate = new Date().toISOString().split('T')[0]
  const month = currentDate.split('-')[1]
  const day = currentDate.split('-')[2]

  // 날짜 선택 핸들러
  const handleDayPress = (day: DayType) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString) // 새 시작일 선택
      setEndDate('') // 끝일자는 초기화
    } else if (startDate && !endDate) {
      if (day.dateString > startDate) {
        setEndDate(day.dateString) // 끝일 선택
      } else {
        setStartDate(day.dateString) // 시작일 재설정
      }
    }
  }

  // 선택된 날짜 범위 마킹하기
  const getMarkedDates = () => {
    let marked: { [key: string]: any } = {}
    if (startDate) {
      marked[startDate] = {
        selected: true,
        startingDay: true,
        color: GlobalStyles.colors.signature,
        textColor: GlobalStyles.colors.white,
      }
    }
    if (endDate) {
      marked[endDate] = {
        selected: true,
        endingDay: true,
        color: GlobalStyles.colors.signature,
        textColor: GlobalStyles.colors.white,
      }

      // 날짜 범위 마킹
      let current = new Date(startDate)
      const end = new Date(endDate)
      while (current < end) {
        const dateString = current.toISOString().split('T')[0]
        if (dateString !== startDate && dateString !== endDate) {
          marked[dateString] = {
            selected: true,
            color: 'rgba(240, 127, 89, 0.2)', // 범위 안의 날짜 색상
            textColor: GlobalStyles.colors.normalDark,
          }
        }
        current.setDate(current.getDate() + 1) // 다음 날짜로 이동
      }
    }
    return marked
  }

  return (
    <View style={styles.setCenter}>
      <View style={styles.container}>
        {/* 상단 날짜 및 선택 날짜 */}
        <View style={styles.header}>
          <Text style={styles.headerDate}>{'Today: ' + month + '/' + day}</Text>
          <Image
            source={require('@/assets/schedule/undderArrow.png')}
            style={styles.arrowIcon}
          />
        </View>

        {/* 달력 */}
        <Calendar
          current={currentDate}
          markedDates={getMarkedDates()}
          onDayPress={handleDayPress}
          markingType={'period'} // 범위 표시를 위한 타입
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

        {/* 선택한 날짜 표시 */}
        {startDate && endDate && (
          <View style={styles.setCenter}>
            <Text style={styles.selectedDate}>
              선택한 기간: {startDate} ~ {endDate}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
