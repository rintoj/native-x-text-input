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
import {
  Platform,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native'
import { styles as s } from 'tachyons-react-native'

const styles = {
  spacer: { padding: 4 },
  input: [s.flex, s.f5, Platform.select({ web: { outlineWidth: 0 } })],
  outerContainer: [s.pv1],
  innerContainer: [s.ba, s.flexRow, s.itemsCenter],
  icon: [s.justifyCenter, s.itemsCenter, s.ph2],
}

export interface TextInputProps
  extends Omit<RNTextInputProps, 'onChange' | 'onBlur'>,
    ContainerStyleProps,
    TextStyleProps,
    FormChildProp<string> {
  width?: number
  height?: number
  label?: string
  labelColor?: string
  rounded?: boolean
  error?: string | Error | null
  disabled?: boolean
  password?: boolean
  icon?: ReactNode
  rightIcon?: ReactNode
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
    value,
    icon,
    rightIcon,
    label,
    onChangeText,
    rounded = false,
    disabled,
    error,
    password,
    fill = true,
    labelColor = COLOR.SECONDARY,
    padding = 'small',
    ...textInputProps
  } = props
  const isEmpty = value == null || value === ''
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : disabled
    ? COLOR.DISABLED
    : COLOR.INPUT
  const hasError = error != null
  const errorColorName = props.errorColor || COLOR.ERROR
  const textColor =
    hasError && !isEmpty
      ? errorColorName
      : disabled
      ? COLOR.TERTIARY
      : textInputProps.textColor ?? COLOR.SECONDARY

  const borderColor = hasError ? errorColorName : COLOR.TRANSPARENT
  const { getColor, getTextColor } = useTheme()

  const containerStyle = useContainerStyle({ ...props, backgroundColor, borderColor, padding })
  const textContainerInputStyle = useContainerStyle({ padding })
  const textInputStyle = useTextStyle({ textColor })
  const transparentColor = getColor?.(COLOR.TRANSPARENT)
  const labelColorStyle = getTextColor?.(labelColor)
  const placeholderColor = getColor?.(props.placeholderColor || COLOR.DIVIDER)
  const errorColor = getTextColor?.(errorColorName)
  const fillStyle: any = fill ? { flex: 'auto' } : undefined
  const content = (
    <View style={[styles.outerContainer, fillStyle]}>
      <View
        style={[
          rounded ? s.brPill : s.br3,
          fill ? [s.flexAuto] : undefined,
          width ? { width } : undefined,
          height ? { height } : undefined,
          styles.innerContainer,
          containerStyle,
        ]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <RNTextInput
          {...(textInputProps as RNTextInputProps)}
          value={value}
          editable={!disabled}
          secureTextEntry={password}
          placeholderTextColor={placeholderColor}
          underlineColorAndroid={transparentColor}
          style={[textInputStyle, textContainerInputStyle, styles.input, ...(style || [])]}
          onChangeText={onChangeText as any}
        />
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
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
      <View style={[styles.outerContainer, fillStyle]}>
        <Text style={[labelColorStyle, s.f5]}>{label}</Text>
        <View style={styles.spacer} />
        {content}
      </View>
    )
  }

  return content
}
