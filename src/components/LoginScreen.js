import React from 'react'
import { View, Text } from 'react-native'
import LoginForm from './LoginForm'


const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const LoginScreen = () => (
  <View style={styles.containerStyle}>
    <LoginForm />
  </View>
)

export default LoginScreen
