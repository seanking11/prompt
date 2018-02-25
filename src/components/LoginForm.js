import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Dimensions, AsyncStorage } from 'react-native'
import { Button, Card, InputItem, WhiteSpace } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
import { emailChanged, passwordChanged } from '../actions'
import createUserMutation from '../mutations/createUser'
import loginUserMutation from '../mutations/loginUser'

const WIDTH = Dimensions.get('window').width
const MARGIN = 60

class LoginForm extends Component {
  onEmailChange = text => {
    this.props.emailChanged(text)
  }

  onPasswordChange = text => {
    this.props.passwordChanged(text)
  }

  onLoginButtonPress = () => {
    const { email, password } = this.props

    this.loginUser(email, password)
  }

  onCreateUserButtonPress = () => {
    const { email, password } = this.props

    this.createUser(email, password)
  }

  loginUser = (email, password) => {
    const input = { email: { email, password } }

    this.props.loginUser({ variables: input })
      .then(data => {
        AsyncStorage.setItem('token', data.data.signinUser.token)
      })
      .catch(err => console.log('Error logging in', err)) // eslint-disable-line no-console
  }

  createUser = (email, password) => {
    const input = {
      authProvider: {
        email: {
          email,
          password
        }
      }
    }

    this.props.createUser({ variables: input })
      // .then(this.loginUser(email, password))
      .catch(err => console.log('Error creating user', err)) // eslint-disable-line no-console
  }

  render() {
    return (
      <Card style={{ width: WIDTH - MARGIN, margin: MARGIN }}>
        <Card.Header
          title='Login'
        />

        <Card.Body>
          <InputItem
            type='text'
            placeholder='Email'
            onChange={phone => this.props.emailChanged(phone)}
            value={this.props.email}
            error={this.props.error.toLowerCase().indexOf('email') >= 0}
          />

          <WhiteSpace />

          <InputItem
            type='password'
            placeholder='Password'
            onChangeText={this.onPasswordChange}
            value={this.props.password}
            error={this.props.error.toLowerCase().indexOf('password') >= 0}
          />

          <Text style={{ fontSize: 18, color: 'red', alignSelf: 'center' }}>
            {this.props.error}
          </Text>

          <Button
            primary
            loading={this.props.loading}
            onClick={this.onLoginButtonPress}
            style={{ margin: 15 }}
          >
            Login
          </Button>

          <Button
            primary
            loading={this.props.loading}
            onClick={this.onCreateUserButtonPress}
            style={{ margin: 15 }}
          >
            Create User
          </Button>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  username: state.auth.username,
  error: state.auth.error,
  loading: state.auth.loading
})

export default compose(
  graphql(createUserMutation, { name: 'createUser' }),
  graphql(loginUserMutation, { name: 'loginUser' }),
  connect(mapStateToProps, { emailChanged, passwordChanged })
)(LoginForm)
