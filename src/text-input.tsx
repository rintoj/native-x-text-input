import { FormChildProp } from 'native-x-form'
import {
  COLOR,
  ContainerStyleProps,
  TextStyleProps,
  useContainerStyle,
  useTextStyle,
  useTheme,
} from 'native-x-theme'
import * as React from 'react'
import { ReactNode } from 'react'
import { Text, TextInput as RNTextInput, View } from 'react-native'
import { styles as s } from 'tachyons-react-native'

const styles = {
  spacer: { padding: 4 },
  input: [s.flex, s.b],
  outerContainer: [s.pv2, s.w100],
  innerContainer: [s.ba, s.flexRow, s.itemsCenter],
  icon: [s.justifyCenter, s.itemsCenter, s.ph2],
}

export interface TextInputProps extends ContainerStyleProps, TextStyleProps, FormChildProp<string> {
  width?: number
  height?: number
  label?: string
  multiline?: boolean
  rounded?: boolean
  error?: string | Error | null
  autoCapitalize?: 'none' | 'words'
  autoFocus?: boolean
  disabled?: boolean
  placeholder?: string
  password?: boolean
  numberOfLines?: number
  icon?: ReactNode
  fill?: boolean
  style?: any
  errorColor?: string
  placeholderColor?: string
}

export function TextInput(props: TextInputProps) {
  const {
    width,
    height,
    style,
    numberOfLines,
    value,
    icon,
    label,
    placeholder,
    multiline,
    onChangeText,
    autoCapitalize,
    autoFocus,
    rounded = false,
    disabled,
    error,
    password,
    fill = true,
    padding = 'small',
  } = props
  const isEmpty = value == null || value === ''
  const backgroundColor = disabled
    ? COLOR.DISABLED
    : props.backgroundColor
    ? props.backgroundColor
    : COLOR.INPUT
  const hasError = error != null
  const errorColorName = props.errorColor || COLOR.ERROR
  const textColor =
    hasError && !isEmpty ? errorColorName : isEmpty || disabled ? COLOR.SECONDARY : COLOR.SECONDARY

  const borderColor = hasError ? errorColorName : COLOR.TRANSPARENT
  const { getColor, getTextColor } = useTheme()

  const containerStyle = useContainerStyle({ ...props, backgroundColor, borderColor, padding })
  const textContainerInputStyle = useContainerStyle({ padding })
  const textInputStyle = useTextStyle({ textColor })
  const primaryTextColor = getTextColor?.(COLOR.SECONDARY)
  const transparentColor = getColor?.(COLOR.TRANSPARENT)
  const placeholderColor = getColor?.(props.placeholderColor || COLOR.DIVIDER)
  const errorColor = getTextColor?.(errorColorName)
  const content = (
    <View style={styles.outerContainer}>
      <View
        style={[
          rounded ? s.brPill : s.br3,
          fill ? [s.w100] : undefined,
          width ? { width } : undefined,
          height ? { height } : undefined,
          styles.innerContainer,
          containerStyle,
        ]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <RNTextInput
          placeholder={placeholder}
          value={value}
          editable={!disabled}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          secureTextEntry={password}
          multiline={multiline}
          placeholderTextColor={placeholderColor}
          underlineColorAndroid={transparentColor}
          style={[
            textInputStyle,
            textContainerInputStyle,
            styles.input,
            textColor,
            ...(style || []),
          ]}
          onChangeText={onChangeText as any}
        />
      </View>
      {!!error && (
        <>
          <View style={styles.spacer} />
          <Text style={errorColor}>{typeof error === 'string' ? error : error?.message}</Text>
        </>
      )}
    </View>
  )

  if (label) {
    return (
      <View style={styles.outerContainer}>
        <Text style={primaryTextColor}>{label}</Text>
        <View style={styles.spacer} />
        {content}
      </View>
    )
  }

  return content
}
