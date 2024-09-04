import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier' // Prettier 설정 추가
import pluginPrettier from 'eslint-plugin-prettier' // Prettier 플러그인 추가

export default [
  // 파일 패턴 설정
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  // 전역 변수 설정 (브라우저 환경)
  { languageOptions: { globals: globals.browser } },

  // ESLint 기본 추천 설정 (JavaScript)
  pluginJs.configs.recommended,

  // TypeScript ESLint 추천 설정
  ...tseslint.configs.recommended,

  // React ESLint 추천 설정
  pluginReact.configs.flat.recommended,

  // Prettier 설정 추가 (ESLint와의 충돌 방지)
  prettier,

  // Prettier 플러그인 활성화 (Prettier 관련 규칙 적용)
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint 에러로 표시
      'import/extensions': ['error', 'ignorePackages'], //라이브러리 패키지에서는 확장자를 필요로 하지 않고, 로컬 파일에서만 확장자를 사용
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', //콘솔 로그를 esLint에서는 기본적으로 금지하기 때문에 개발 환경에서는 허용하고 프로덕션에서는 금지
    },
  },
]
