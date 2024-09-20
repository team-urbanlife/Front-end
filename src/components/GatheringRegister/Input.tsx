import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { GlobalStyles } from '../../constants/colors'

interface InputProps {
  label?: string
  invalid?: boolean
  style?: StyleProp<ViewStyle> // 스타일은 array나 object 둘 다 받을 수 있어야 함
  textInputConfig: TextInputProps
}

const Input: React.FC<InputProps> = ({
  label,
  invalid,
  style,
  textInputConfig,
}) => {
  // 스타일을 병합
  const inputStyles = StyleSheet.flatten([styles.input, style]) as ViewStyle

  if (textInputConfig?.multiline) {
    Object.assign(inputStyles, styles.inputMultiline)
  }

  if (invalid) {
    Object.assign(inputStyles, styles.invalidInput)
  }

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
          {label}
        </Text>
      )}
      {/* 외부에서 전달된 textInputConfig 스타일이 병합되도록 처리 */}
      <TextInput
        style={inputStyles}
        {...textInputConfig}
        placeholderTextColor="#C0C0C0" // placeholder 색상 고정
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    borderBottomWidth: 1, // 하단에 선 추가
    borderBottomColor: '#C0C0C0', // 선 색상 회색으로 설정
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
