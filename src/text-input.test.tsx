import { COLOR, THEME, ThemeProvider } from 'native-x-theme'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { TextInput } from './text-input'

const Spacer = () => <View style={{ padding: 8 }} />

export const THEMES = {
  [THEME.DARK]: {
    [COLOR.PRIMARY]: '#212121',
    [COLOR.SECONDARY]: '#FFFFFF',
    [COLOR.TERTIARY]: '#F3E8C0',
    [COLOR.ACCENT]: '#71F28F',
    [COLOR.DIVIDER]: '#707070',
    [COLOR.DISABLED]: '#252525',
    [COLOR.INPUT]: 'rgba(134, 149, 172, 0.4)',
    [COLOR.SUCCESS]: '#63D471',
    [COLOR.ERROR]: '#ED2733',
    [COLOR.WARNING]: '#F9D101',
    [COLOR.TRANSPARENT]: 'transparent',
  },
}

export function TextInputTest() {
  return (
    <ThemeProvider theme={THEME.DARK} themes={THEMES}>
      <View
        style={[{ flex: 1, alignItems: 'center', backgroundColor: 'black', paddingVertical: 32 }]}
      >
        <ScrollView style={{ width: '100%', flex: 1 }}>
          <View style={[{ flex: 1, alignItems: 'center', padding: 32 }]}>
            <TextInput placeholder='Email' />
            <Spacer />
            <TextInput placeholder='Password' password />
            <Spacer />
            <TextInput placeholder='Email' label='Email' />
            <Spacer />
            <TextInput placeholder='Password' password label='Password' />
            <Spacer />
            <TextInput placeholder='Email' rounded />
            <Spacer />
            <TextInput placeholder='Password' password rounded />
            <Spacer />
            <TextInput placeholder='Email' label='Email' rounded />
            <Spacer />
            <TextInput placeholder='Password' password label='Password' rounded />
            <Spacer />
            <TextInput label='Email' placeholder='Email' error='This input is not valid!' />
            <Spacer />
            <TextInput label='Email' placeholder='Email' error='This input is not valid!' rounded />
            <Spacer />
            <TextInput
              placeholder='Email'
              error='This input is not valid!'
              errorColor={COLOR.WARNING}
            />
          </View>
        </ScrollView>
      </View>
    </ThemeProvider>
  )
}
