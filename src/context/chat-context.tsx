import React, { createContext, ReactNode, useContext, useState } from 'react'

// Context 생성
const ChatContext = createContext<any>(null)
interface Props {
  children: ReactNode
}
// Provider 컴포넌트 생성
export function ChatProvider({ children }: Props) {
  const [chatRooms, setChatRooms] = useState([])

  return (
    <ChatContext.Provider value={{ chatRooms, setChatRooms }}>
      {children}
    </ChatContext.Provider>
  )
}

// ChatContext를 사용하기 위한 커스텀 훅
export const useChat = () => useContext(ChatContext)
