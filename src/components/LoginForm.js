import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Dimensions, View } from 'react-native'
import { Button, Card, InputItem, WhiteSpace } from 'antd-mobile'
import { graphql, compose } from 'react-apollo'
// import { Input, Spinner, Card, CardSection } from './common'
import { emailChanged, passwordChanged, usernameChanged, loginUser } from '../actions'
import createUserMutation from '../mutations/createUser'
import loginUserMutation from '../mutations/loginUser'

const WIDTH = Dimensions.get('window').width
const MARGIN = 60

class LoginForm extends Component {
  componentWillUpdate(nextProps) {
    console.log(nextProps);
  }

  onEmailChange = text => {
    this.props.emailChanged(text)
  }

  onPasswordChange = text => {
    this.props.passwordChanged(text)
  }

  onButtonPress = () => {
    const { email, password } = this.props

    const input = { email, password }

    this.props.mutate({
      variables: { input }
      // refetchQueries: [{ query }]
    }).catch(err => {
      const errors = err.graphQLErrors.map(error => error.message)
      console.log('error creating', err);
      this.setState({ errors })
    })
  }

  onCreateUserButtonPress = () => {
    const { email, username, password } = this.props

    const input = { email, username, password }

    this.props.mutate({
      variables: { input }
      // refetchQueries: [{ query }]
    }).catch(err => {
      const errors = err.graphQLErrors.map(error => error.message)
      console.log('error creating user:', err)
      this.setState({ errors })
    })
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
            type='text'
            placeholder='Username'
            onChangeText={username => this.props.usernameChanged(username)}
            value={this.props.username}
            error={this.props.error.toLowerCase().indexOf('username') >= 0}
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
            onClick={this.onButtonPress}
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
  graphql(createUserMutation),
  // graphql(loginUserMutation),
  connect(mapStateToProps, { emailChanged, passwordChanged, usernameChanged, loginUser })
)(LoginForm)
