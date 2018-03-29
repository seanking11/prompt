import React from 'react'
import { Text as DefaultText } from 'react-native'

const styles = {
  textStyle: {
    fontFamily: 'ProximaNovaRegular'
  }
}

const MyAppText = ({ children, style, ...rest }) => (
  <DefaultText style={[styles.textStyle, style]} {...rest}>{children}</DefaultText>
)

export default MyAppText
