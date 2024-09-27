import axios from 'axios'
import * as WebBrowser from 'expo-web-browser'

const BACKEND_URL = ''
const KAKAO_LOGIN_URL = 'http://dev.wegotoo.net/oauth/login/kakao'
const REDIRECT_URI = 'http://localhost:3000/test'
export function openKakaoLogin() {
  //const loginUrl = `${KAKAO_LOGIN_URL}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  const loginUrl =
    'https://web-wegotoo.vercel.app/app/oauth/kakao?redirect_uri=https://web-wegotoo.vercel.app/app/oauth/callback'
  // 웹 브라우저에서 카카오 로그인 페이지 열기
  WebBrowser.openBrowserAsync(loginUrl)
}
