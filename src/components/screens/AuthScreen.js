import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import _ from 'lodash'
import LoginForm from '../LoginForm'

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
}

class AuthScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    // AsyncStorage.removeItem('token')
    let token = await AsyncStorage.getItem('token')

    if (token) {
      this.props.navigation.navigate('feed')
    } else {
      this.setState({ token: false })
    }
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <View style={styles.containerStyle}>
        <LoginForm />
      </View>
    )
  }
}

export default AuthScreen
