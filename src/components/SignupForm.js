import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Dimensions } from 'react-native'
import { Button, Card, InputItem, WhiteSpace } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
import { emailChanged, passwordChanged } from '../actions'
import createUserMutation from '../mutations/createUser'

const WIDTH = Dimensions.get('window').width
const MARGIN = 60

class LoginForm extends Component {
  state = {
    error: ''
  }

  onEmailChange = text => {
    this.props.emailChanged(text)
  }

  onPasswordChange = text => {
    this.props.passwordChanged(text)
  }

  onCreateUserButtonPress = () => {
    const { email, password } = this.props

    if (this.validateInput(email, password)) {
      this.createUser(email, password)
    }
  }

  validateInput = (email, password) => {
    if (!email && !password) {
      this.setState({ error: 'Please enter an email and password.' })
      return false
    } else if (!email) {
      this.setState({ error: 'Please enter a valid email.' })
      return false
    } else if (!password) {
      this.setState({ error: 'Please enter a password.' })
      return false
    }
    this.setState({ error: '' })
    return true
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

    this.setState({ loading: true })
    this.props.createUser({ variables: input })
      .then(() => {
        this.setState({ loading: false })
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
            placeholder='Email'
            onChange={phone => this.props.emailChanged(phone)}
            value={this.props.email}
            error={this.state.error.toLowerCase().indexOf('email') >= 0}
          />

          <WhiteSpace />

          <InputItem
            type='password'
            placeholder='Password'
            onChangeText={this.onPasswordChange}
            value={this.props.password}
            error={this.state.error.toLowerCase().indexOf('password') >= 0}
          />

          <Text style={{ fontSize: 18, color: 'red', alignSelf: 'center' }}>
            {this.state.error}
          </Text>

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
