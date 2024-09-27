import { createContext, useReducer, ReactNode } from 'react'
import Gathering from '../screens/gathering/type/GatheringType'
import { GatheringData } from '../components/GatheringRegister/GatheringRegisterForm'
export interface GatheringsContextType {
  gatherings: Gathering[]
  addGathering: (gatheringData: Gathering) => void
  setGatherings: (gatherings: Gathering[]) => void
  deleteGathering: (id: number) => void
  updateGathering: (
    id: number,
    gatheringData: Omit<Gathering, 'accompanyId'>,
  ) => void
}

export const GatheringsContext = createContext<GatheringsContextType>({
  gatherings: [],
  addGathering: () => {},
  setGatherings: () => {},
  deleteGathering: () => {},
  updateGathering: () => {},
})

type Action =
  | { type: 'ADD'; payload: Gathering }
  | { type: 'SET'; payload: Gathering[] }
  | {
      type: 'UPDATE'
      payload: { id: number; data: Omit<Gathering, 'accompanyId'> }
    }
  | { type: 'DELETE'; payload: number }

function gatheringReducer(state: Gathering[], action: Action): Gathering[] {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'SET':
      return action.payload.reverse()
    case 'UPDATE':
      const updatableGatheringIndex = state.findIndex(
        (gathering) => gathering.accompanyId === action.payload.id,
      )
      const updatedItem = {
        ...state[updatableGatheringIndex],
        ...action.payload.data,
      }
      const updatedState = [...state]
      updatedState[updatableGatheringIndex] = updatedItem
      return updatedState
    case 'DELETE':
      return state.filter(
        (gathering) => gathering.accompanyId !== action.payload,
      )
    default:
      return state
  }
}

interface Props {
  children: ReactNode
}

function GatheringsContextProvider({ children }: Props) {
  const [gatheringState, dispatch] = useReducer(gatheringReducer, [])

  function addGathering(gatheringData: Gathering) {
    const newGathering = { ...gatheringData } // 임시 id 생성
    // const { id, ...rest } = newGathering // 'id'를 제외하고 나머지 속성을 'rest'에 저장
    dispatch({ type: 'ADD', payload: newGathering }) // 'rest'만 dispatch
  }

  function setGatherings(gatherings: Gathering[]) {
    dispatch({ type: 'SET', payload: gatherings })
  }

  function deleteGathering(id: number) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateGathering(
    id: number,
    gatheringData: Omit<Gathering, 'accompanyId'>,
  ) {
    dispatch({ type: 'UPDATE', payload: { id, data: gatheringData } })
  }

  const value: GatheringsContextType = {
    gatherings: gatheringState,
    addGathering,
    setGatherings,
    deleteGathering,
    updateGathering,
  }

  return (
    <GatheringsContext.Provider value={value}>
      {children}
    </GatheringsContext.Provider>
  )
}

export default GatheringsContextProvider
