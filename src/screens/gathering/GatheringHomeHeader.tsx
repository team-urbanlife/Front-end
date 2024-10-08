import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons' // 아이콘 패키지에서 가져오는 방식
import { NavigationProp, useNavigation } from '@react-navigation/native' // 네비게이션 타입 정의
import { styles } from '../schedule/Styles/ScheduleHomeStyles'
import { GlobalStyles } from '@/constants/colors'
import {
  styles as aliasStyles,
  text,
} from '@/screens/schedule/Styles/ScheduleSpotStyles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// selectedLocations를 props로 받아오기
interface GatheringHomeHeaderProps {
  selectedLocations: string[] | null // 부모로부터 전달받는 배열
  identifier: string
}

type RootStackParamList = {
  GatheringLocationSearch: { inputText?: string }
  // 다른 스크린 타입이 있다면 여기에 추가
}
type GatheringLocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GatheringLocationSearch'
>

const GatheringHomeHeader: React.FC<GatheringHomeHeaderProps> = ({
  selectedLocations,
  identifier,
}) => {
  const navigation = useNavigation<GatheringLocationScreenNavigationProp>()

  return (
    <View
      style={{
        height: 150, // 명확한 높이 추가
        backgroundColor: 'white',
        justifyContent: 'center',
      }}
    >
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Image style={styles.Logo} source={require('@/assets/logo.png')} />
          <View style={styles.searchNotiContainer}>
            <TouchableOpacity
              onPress={() => {
                //navigation.navigate('' as never)
              }}
            >
              {/* <Image
                source={require('@/assets/schedule/search.png')}
                style={styles.searchNotiIcon}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //navigation.navigate('' as never)
              }}
            >
              <Image
                source={require('@/assets/notification.png')}
                style={styles.searchNotiIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 두 번째 줄 (필터 아이콘과 지역 선택 버튼들) */}
        {identifier === 'GatheringHome' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 5,
              flexWrap: 'wrap', // 자동으로 다음 줄로 넘기기
            }}
          >
            {/* 필터 아이콘 */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}
              onPress={() =>
                navigation.navigate('GatheringLocationSearch', {
                  inputText: '',
                })
              }
            >
              <Icon
                name="list"
                size={30}
                color={GlobalStyles.colors.signature}
              />
            </TouchableOpacity>

            {/* selectedLocations을 사용하여 UI 업데이트 */}
            {selectedLocations &&
              selectedLocations.map((location, index) => (
                <View key={index} style={aliasStyles.regionContainer}>
                  <Text style={text.regionText}>{location}</Text>
                </View>
              ))}
          </View>
        )}

        {identifier === 'ChatHome' && (
          /* 검색창과 돋보기 아이콘을 한 뷰로 묶음 */
          <View style={styles2.searchContainer}>
            <TextInput
              placeholder="검색어를 입력하세요"
              //onChangeText={handleTextChange}
              style={styles2.searchTextInput}
            />

            <TouchableOpacity>
              <Icon
                name="search"
                size={24}
                color="black"
                style={styles2.searchIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default GatheringHomeHeader

const styles2 = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
    width: '95%', // 가로폭을 전체의 80%로 설정
    alignSelf: 'center', // 수평으로 가운데 정렬
  },
  searchTextInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
})
