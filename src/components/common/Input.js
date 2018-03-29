import React from 'react'
import { View, TextInput } from 'react-native'
import { MyAppText } from './MyAppText'

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

// eslint-disable-next-line object-curly-newline
const Input = ({ label, onChangeText, value, placeholder, secureTextEntry }) => {
  const { labelStyle, inputStyle, containerStyle } = styles

  return (
    <View style={containerStyle}>
      <MyAppText style={labelStyle}>{label}</MyAppText>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default Input
