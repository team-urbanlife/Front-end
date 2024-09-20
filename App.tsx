import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import {
  NavigationContainer,
  useNavigation,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import RecentGatherings from './src/screens/gathering/GatheringHomeScreen'
import { GlobalStyles } from './src/constants/colors'
import GatheringsContextProvider from './src/context/gathering-context'
import Icon from 'react-native-vector-icons/MaterialIcons' // MaterialIcons 아이콘 사용
import { Ionicons } from '@expo/vector-icons'

import GatheringLocationSearch from './src/screens/gathering/GatheringLocationSearchScreen'
import { useState } from 'react'
import GatheringRegister from './src/screens/gathering/GatheringRegisterScreen'
import GatheringDetailScreen from './src/screens/gathering/GatheringDetailScreen'

const Stack = createNativeStackNavigator<RootStackParamList>() // 네비게이션 스택에 타입 정의 적용
const Drawer = createDrawerNavigator()

/* function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon
              name="menu"
              size={30}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
        drawerType: 'back', // Drawer가 화면 위로 덮이게 설정
        overlayColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 검은색 오버레이 추가
      })}
    >
      <Drawer.Screen name="Notifications" component={RecentGatherings} />
    </Drawer.Navigator>
  )
} */

// 네비게이션 스택의 타입을 정의합니다.
type RootStackParamList = {
  RecentGathering: undefined
  GatheringLocationSearch: undefined
  GatheringRegister: undefined
  GatheringDetail: { gatheringId: string } // GatheringDetail에 전달되는 파라미터 정의
}

interface GatheringHomeHeaderProps {
  navigation: NavigationProp<any>
}

const GatheringHomeHeader: React.FC<GatheringHomeHeaderProps> = ({
  navigation,
}) => {
  return (
    <View style={{ marginTop: 30 }}>
      {/* 첫 번째 줄 (WEGOTOO, 돋보기 아이콘, 종 아이콘) */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        {/* WEGOTOO 텍스트 로고 */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF6B6B' }}>
          WEGOTOO
        </Text>

        {/* 검색 아이콘과 알림 아이콘 */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => console.log('Search pressed')}
          >
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Notifications pressed')}
          >
            <Icon name="notifications-none" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 두 번째 줄 (필터 아이콘, 오사카 버튼) */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 5,
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
            navigation.navigate('GatheringLocationSearch', { inputText: '' })
          }
        >
          <Icon name="list" size={30} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <GatheringsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontSize: 20,
              },
              headerTitleAlign: 'center',
              headerTintColor: 'black',
            }}
          >
            <Stack.Screen
              name="RecentGathering"
              component={RecentGatherings}
              options={{
                header: ({ navigation }) => (
                  <GatheringHomeHeader navigation={navigation} />
                ),
                contentStyle: { backgroundColor: 'white' },
              }}
            />
            <Stack.Screen
              name="GatheringLocationSearch"
              component={GatheringLocationSearch}
              options={{
                animation: 'slide_from_left',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GatheringRegister"
              component={GatheringRegister}
              options={{
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="GatheringDetail"
              component={GatheringDetailScreen} // 타입이 정의된 컴포넌트 전달
              options={{
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GatheringsContextProvider>
    </>
  )
}

const styles = StyleSheet.create({})
