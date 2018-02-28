import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import _ from 'lodash'
import LoginForm from '../LoginForm'
import SignupForm from '../SignupForm'

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
}

class AuthScreen extends Component {
  state = {
    token: '',
    showLogin: true
  }

  async componentWillMount() {
    // AsyncStorage.removeItem('token')
    let token = await AsyncStorage.getItem('token')

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
      <View style={styles.containerStyle}>
        {this.state.showLogin ? <LoginForm navigation={this.props.navigation} /> : <SignupForm />}
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>{this.state.showLogin ? 'Create an account' : 'Already have an account?'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AuthScreen
