import React, { createContext, useContext, useState, ReactNode } from 'react'

// 타입 정의
export interface ScheduleContextType {
  scheduleId: number | null
  setScheduleId: React.Dispatch<React.SetStateAction<number | null>>
}

// ScheduleContext 타입을 명시
const ScheduleContext = createContext<ScheduleContextType | null>(null)

export const useSchedule = () => {
  const context = useContext(ScheduleContext)
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider')
  }
  return context
}

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [scheduleId, setScheduleId] = useState<number | null>(null)

  return (
    <ScheduleContext.Provider value={{ scheduleId, setScheduleId }}>
      {children}
    </ScheduleContext.Provider>
  )
}
