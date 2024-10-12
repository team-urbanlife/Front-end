import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const apiClient = axios.create({
  baseURL: 'https://dev.wegotoo.net/v1',
})
