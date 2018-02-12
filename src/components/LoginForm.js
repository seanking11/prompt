import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Dimensions } from 'react-native'
import { Input, Spinner, Card, CardSection } from './common'
import Button from './common/Button'
import { emailChanged, passwordChanged, loginUser } from '../actions'

const WIDTH = Dimensions.get('window').width

class LoginForm extends Component {
  onEmailChange = text => {
    this.props.emailChanged(text)
  }

  onPasswordChange = text => {
    this.props.passwordChanged(text)
  }

  onButtonPress = () => {
    const { email, password } = this.props

    this.props.loginUser({ email, password })
  }

  render() {
    return (
      <Card style={{ width: WIDTH - 15, margin: 15 }}>
        <CardSection>
          <Input
            label='Email'
            placeholder='email@gmail.com'
            onChangeText={this.onEmailChange}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
            onChangeText={this.onPasswordChange}
            value={this.props.password}
          />
        </CardSection>

        <Text style={{ fontSize: 18, color: 'red', alignSelf: 'center' }}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.props.loading ? (
            <Spinner size='large' />
          ) : (
            <Button onPress={this.onButtonPress}>
              Login
            </Button>
          )}
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error,
  loading: state.auth.loading
})

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)
