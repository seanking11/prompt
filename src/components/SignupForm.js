import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions, Keyboard, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { Button, Card, InputItem, WhiteSpace } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native'
import { MyAppText } from './common'
import { emailChanged, passwordChanged } from '../actions'
import createUserMutation from '../mutations/createUser'

const WIDTH = Dimensions.get('window').width
const MARGIN = 60

const styles = {
  error: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center',
    marginTop: 15
  }
}

class LoginForm extends Component {
  state = {
    error: '',
    triedLoggingIn: false,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  onEmailChange = text => {
    this.props.emailChanged(text)
  }

  onPasswordChange = text => {
    this.props.passwordChanged(text)
  }

  onCreateUserButtonPress = () => {
    this.validateInput()
  }

  validateInput = () => { // eslint-disable-line consistent-return
    if (this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.email !== '' &&
      this.state.password !== ''
    ) {
      this.setState({ error: '', triedLoggingIn: false })
      this.createUser()
    } else {
      this.setState({ triedLoggingIn: true, error: 'Please fill in all fields.' })
    }
  }

  createUser = () => {
    const { firstName, lastName, email, password } = this.state // eslint-disable-line object-curly-newline
    const input = {
      firstName,
      lastName,
      authProvider: {
        email: {
          email,
          password
        }
      }
    }

    Keyboard.dismiss()
    this.setState({ loading: true })
    this.props.createUser({ variables: input })
      .then(user => {
        this.setState({ loading: false })
        AsyncStorage.setItem('userName', JSON.stringify(user))
          .then(() => {
            this.props.toggleLoginState()
            this.props.navigation.navigate('onboarding')
          })
      })
      .catch(err => {
        console.log('Error creating user', err) // eslint-disable-line no-console
        this.setState({ loading: false, error: err.toString(), triedLoggingIn: true })
      })
  }

  render() {
    const inputStyles = {
      ...InputItemStyle,
      input: {
        ...InputItemStyle.input,
        fontFamily: 'ProximaNovaRegular'
      }
    }

    return (
      <KeyboardAvoidingView enabled behavior='padding'>
        <Card style={{ width: WIDTH - MARGIN, margin: MARGIN }}>
          <Card.Header
            title={<MyAppText style={{ fontSize: 20, fontFamily: 'ProximaNovaBold' }}>Signup</MyAppText>}
          />

          <Card.Body>
            <InputItem
              type='text'
              placeholder='First Name'
              onChange={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              error={this.state.firstName === '' && this.state.triedLoggingIn}
              styles={inputStyles}
            />

            <WhiteSpace />

            <InputItem
              type='text'
              placeholder='Last Name'
              onChange={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              error={this.state.lastName === '' && this.state.triedLoggingIn}
              styles={inputStyles}
            />

            <WhiteSpace />

            <InputItem
              type='text'
              placeholder='Email'
              onChange={email => this.setState({ email })}
              value={this.state.email}
              error={
                this.state.triedLoggingIn &&
                (this.state.password === '' || this.state.error.toLowerCase().indexOf('user') >= 0)
              }
            />

            <WhiteSpace />

            <InputItem
              type='password'
              placeholder='Password'
              onChange={password => this.setState({ password })}
              value={this.state.password}
              error={this.state.password === '' && this.state.triedLoggingIn}

            />

            <MyAppText style={styles.error}>
              {this.state.error}
            </MyAppText>

            <Button
              primary
              loading={this.state.loading}
              onClick={this.onCreateUserButtonPress}
              style={{ margin: 15 }}
            >
              <MyAppText>Create User</MyAppText>
            </Button>
          </Card.Body>
        </Card>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  username: state.auth.username,
  error: state.auth.error
})

export default compose(
  graphql(createUserMutation, { name: 'createUser' }),
  connect(mapStateToProps, { emailChanged, passwordChanged })
)(LoginForm)
