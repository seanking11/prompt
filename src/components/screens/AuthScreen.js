import React, { Component } from 'react'
import { View, TouchableOpacity, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import _ from 'lodash'
import { DismissKeyboard, MyAppText } from '../common'
import LoginForm from '../LoginForm'
import SignupForm from '../SignupForm'

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
}

const DismissKeyboardView = DismissKeyboard(View) // eslint-disable-line new-cap

class AuthScreen extends Component {
  state = {
    token: '',
    showLogin: true
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      this.props.navigation.navigate('feed')
    } else {
      this.setState({ token: false })
    }
  }

  onButtonPress = () => this.setState({ showLogin: !this.state.showLogin })

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <DismissKeyboardView style={styles.containerStyle}>
        {this.state.showLogin ?
          <LoginForm navigation={this.props.navigation} /> :
          <SignupForm toggleLoginState={this.onButtonPress} navigation={this.props.navigation} />
        }
        <TouchableOpacity onPress={this.onButtonPress}>
          <MyAppText>{this.state.showLogin ? 'Create an account' : 'Already have an account?'}</MyAppText>
        </TouchableOpacity>
      </DismissKeyboardView>
    )
  }
}

export default AuthScreen
