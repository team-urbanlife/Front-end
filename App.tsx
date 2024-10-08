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
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import GatheringLocationSearch from './src/screens/gathering/GatheringLocationSearchScreen'
import GatheringRegister from './src/screens/gathering/GatheringRegisterScreen'
import GatheringDetailScreen from './src/screens/gathering/GatheringDetailScreen'
import ScheduleHome from '@/screens/schedule/ScheduleHomeScreen'
import ScheduleSpot from '@/screens/schedule/ScheduleSpotScreen'
import ScheduleDetail from '@/screens/schedule/ScheduleDetailScreen'
import ScheduleCalendar from '@/screens/schedule/ScheduleCalendarScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import GatheringHomeHeader from '@/screens/gathering/GatheringHomeHeader'
import { MainDummyHome } from '@/screens/dummyHome/mainHomeDummy'
import { ChatHomeDummy } from '@/screens/dummyHome/ChatHomeDummy'
import { MypageHomeDummy } from '@/screens/dummyHome/MyPageHomeDummy'
import LoginHomeScreen from '@/screens/login/LoginHomeScreen'
import KakaoLoginView from '@/screens/login/KakaoLoginView'
import ChatHomeScreen from '@/screens/chat/ChatHomeScreen'
import ChatRoomDetail from '@/screens/chat/ChatRoomDetailScreen'
import LoginScreen from '@/screens/login/LoginHomeScreen2'
import { ChatProvider } from '@/context/chat-context'
const Stack = createNativeStackNavigator<RootStackParamList>() // 네비게이션 스택에 타입 정의 적용
const Drawer = createDrawerNavigator()
const BottomTabs = createBottomTabNavigator()
function WeGoTooOverview() {
  //const navigation = useNavigation()
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        //headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        //headerTintColor: 'white',
        //tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.signature,
      })}
    >
      <BottomTabs.Screen
        name="MainDummyHome"
        component={MainDummyHome}
        options={{
          title: '메인 홈화면',
          tabBarLabel: '메인 홈화면',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),

          headerTitleAlign: 'center',

          //headerStyle: { backgroundColor: 'white' },
          //contentStyle: { backgroundColor: 'white' },
        }}
      />
      <BottomTabs.Screen
        name="BtScheduleHome"
        component={ScheduleHome}
        options={{
          headerShown: false,
          title: '일정관리 홈화면',
          tabBarLabel: '일정관리 홈화면',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="BtRecentGathering"
        component={RecentGatherings}
        options={{
          title: '모집글  홈화면',
          tabBarLabel: '모집글  홈화면',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
          /* header: ({ navigation }) => (
            <GatheringHomeHeader navigation={navigation} />
          ), */
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="ChatHomeScreen"
        component={ChatHomeScreen}
        options={{
          title: '채팅  홈화면',
          tabBarLabel: '채팅  홈화면',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="MypageHomeDummy"
        component={MypageHomeDummy}
        options={{
          title: '마이페이지',
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

// 네비게이션 스택의 타입을 정의합니다.
type RootStackParamList = {
  RecentGathering: undefined
  GatheringLocationSearch: undefined
  GatheringRegister: undefined
  GatheringDetail: { gatheringId: number } // GatheringDetail에 전달되는 파라미터 정의
  ScheduleHome: undefined
  SceduleSpot: undefined
  SceduleDetail: undefined
  SceduleCalendar: undefined
  WeGoTooOverview: undefined
  KakaoLoginView: undefined
  LoginHomeScreen: undefined
  ChatRoomDetail: { roomId: number; title: string }
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GatheringsContextProvider>
          <ChatProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="LoginHomeScreen"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="KakaoLoginView"
                  component={KakaoLoginView} // 타입이 정의된 컴포넌트 전달
                  options={{
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="WeGoTooOverview"
                  component={WeGoTooOverview}
                  options={{ headerShown: false }}
                />
                {/* <Stack.Screen
                name="ScheduleHome"
                component={ScheduleHome}
                options={{
                  headerShown: false,
                }}
              /> */}
                <Stack.Screen
                  name="SceduleCalendar"
                  component={ScheduleCalendar}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SceduleSpot"
                  component={ScheduleSpot}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SceduleDetail"
                  component={ScheduleDetail}
                  options={{
                    headerShown: false,
                  }}
                />
                {/* <Stack.Screen
                name="RecentGathering"
                component={RecentGatherings}
                options={{
                  header: ({ navigation }) => (
                    <GatheringHomeHeader navigation={navigation} />
                  ),
                  contentStyle: { backgroundColor: 'white' },
                }}
              /> */}
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
                    headerBackTitleVisible: false, // 뒤로가기 텍스트 숨기기
                    headerTitleAlign: 'center',
                    headerTintColor: 'black', // 뒤로가기 버튼 아이콘 색상을 검정색으로 설정
                    headerStyle: {
                      backgroundColor: 'white', // 헤더 배경색 설정
                    },
                  }}
                />
                <Stack.Screen
                  name="GatheringDetail"
                  component={GatheringDetailScreen} // 타입이 정의된 컴포넌트 전달
                  options={{
                    headerBackTitleVisible: false, // 뒤로가기 텍스트 숨기기
                    headerTitleAlign: 'center',
                    headerTintColor: 'black', // 뒤로가기 버튼 아이콘 색상을 검정색으로 설정
                    headerStyle: {
                      backgroundColor: 'white', // 헤더 배경색 설정
                    },
                  }}
                />
                <Stack.Screen
                  name="ChatRoomDetail"
                  component={ChatRoomDetail} // 타입이 정의된 컴포넌트 전달
                  options={{
                    headerBackTitleVisible: false, // 뒤로가기 텍스트 숨기기
                    headerTitleAlign: 'center',
                    headerTintColor: 'black', // 뒤로가기 버튼 아이콘 색상을 검정색으로 설정
                    headerStyle: {
                      backgroundColor: 'white', // 헤더 배경색 설정
                    },
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ChatProvider>
        </GatheringsContextProvider>
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({})
