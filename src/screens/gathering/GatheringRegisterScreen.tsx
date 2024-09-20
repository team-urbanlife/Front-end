import React, { useLayoutEffect, useState, useContext } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons' // 아이콘 사용을 위한 패키지
import { GatheringsContext } from '../../context/gathering-context'
import { storeGathering } from '../gathering/gatheringHttp'
import ErrorOverlay from '../../components/GatheringHome/ErrorOverlay'
import LoadingOverlay from '../../components/GatheringHome/LoadingOverlay'
import GatheringRegisterForm from '../../components/GatheringRegister/GatheringRegisterForm'
import Gathering from '../../components/GatheringHome/gatheringclass'
//import GatheringData from '../../components/GatheringRegister/GatheringRegisterForm'
import { GatheringData } from '../../components/GatheringRegister/GatheringRegisterForm'

interface GatheringRegisterProps {
  navigation: any // 네비게이션 타입은 필요에 따라 구체적으로 정의 가능
}

const GatheringRegister: React.FC<GatheringRegisterProps> = ({
  navigation,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const gatheringsCtx = useContext(GatheringsContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '게시글 작성', // 가운데 타이틀
    })
  }, [navigation])

  async function confirmHandler(gatheringData: Gathering) {
    setIsSubmitting(true)
    try {
      const id: string = await storeGathering(gatheringData)
      gatheringsCtx.addGathering({ ...gatheringData })

      navigation.goBack()
    } catch (error) {
      setError('Could not save data - please try again later!')
      setIsSubmitting(false)
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <GatheringRegisterForm onSubmit={confirmHandler} />
    </ScrollView>
  )
}

export default GatheringRegister

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
})
