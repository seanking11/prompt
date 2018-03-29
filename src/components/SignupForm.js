import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions, Keyboard } from 'react-native'
import { Button, Card, InputItem, WhiteSpace } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
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
      .then(() => {
        this.setState({ loading: false })
        this.props.toggleLoginState()
      })
      // .then(this.loginUser(email, password))
      .catch(err => {
        console.log('Error creating user', err) // eslint-disable-line no-console
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <Card style={{ width: WIDTH - MARGIN, margin: MARGIN }}>
        <Card.Header
          title='Signup'
        />

        <Card.Body>
          <InputItem
            type='text'
            placeholder='First Name'
            onChange={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            error={this.state.firstName === '' && this.state.triedLoggingIn}
          />

          <WhiteSpace />

          <InputItem
            type='text'
            placeholder='Last Name'
            onChange={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            error={this.state.lastName === '' && this.state.triedLoggingIn}
          />

          <WhiteSpace />

          <InputItem
            type='text'
            placeholder='Email'
            onChange={email => this.setState({ email })}
            value={this.state.email}
            error={this.state.email === '' && this.state.triedLoggingIn}
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
  error: state.auth.error
})

export default compose(
  graphql(createUserMutation, { name: 'createUser' }),
  connect(mapStateToProps, { emailChanged, passwordChanged })
)(LoginForm)
