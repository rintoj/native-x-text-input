# native-x-text-input

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Input component for capturing text input from users.

## Install

### Yarn

```sh
yarn add native-x-text-input
```

### NPM

```sh
npm install native-x-text-input
```

## Usage

```tsx
import { TextInput } from 'native-x-text-input'

function MyComponent() {
  return (
    <Stack>
      ...
      <TextInput
        label='Email'
        placeholder='Enter an email'
        rounded
        error='This input is not valid!'
      />
      ...
    </Stack>
  )
}
```

This component is compatible with [`native-x-form`]('https://github.com/rintoj/native-x-form')

```tsx
import { TextInput } from 'native-x-text-input'
import { Form, FormInput } from 'native-x-form'

interface FormState {
  email?: string
}

function MyComponent() {
  const onChange = ({ state: { email }, isValid }: { state: FormState; isValid: boolean }) => {
    console.log({ email })
  }

  return (
    <Form<FormState> state={state} onChange={onChange}>
      ...
      <FormInput name='email' validators={[isInvalidEmail('This is invalid email!')]}>
        <TextInput label='Email' placeholder='Enter an email' rounded />
      </FormInput>
      ...
    </Form>
  )
}
```

## API

| Property                    | Default Value | Usage                                                      |
| --------------------------- | ------------- | ---------------------------------------------------------- |
| label?: string              |               | Label for the input                                        |
| placeholder?: string        |               | Placeholder text for the text input                        |
| multiline?: boolean         |               | Set true to allow more than one line for the input         |
| rounded?: boolean           | false         | Set true to use rounded corners                            |
| error?: string              |               | Error message to show                                      |
| autoCapitalization?: string |               | Valid values are: 'none', 'words'                          |
| autoFocus?: boolean         |               | Set true to auto focus                                     |
| disabled?: boolean          |               | Set true to disable input                                  |
| password?: boolean          |               | Set true to use the input as secret input                  |
| numberOfLines?: number      |               | Number of lines to allow                                   |
| icon?: ReactNode            |               | Icon component to render with in the component             |
| rightIcon?: ReactNode       |               | Icon component to render at the right end of the component |
| fill?: boolean              |               | Set true to fill the container                             |
| width?: number              |               | Width of the text input                                    |
| height?: number             |               | Height of the text input                                   |
| errorColor?: string         | 'error'       | One of the colors specified by theme provider              |

## Automatic Release

Here is an example of the release type that will be done based on a commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |
