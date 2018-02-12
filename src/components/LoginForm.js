import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Dimensions, View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { Button, Card, InputItem, WhiteSpace } from 'antd-mobile'
// import { Input, Spinner, Card, CardSection } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions'

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

    this.props.loginUser({ email, password })
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
            onClick={this.onButtonPress}
            style={{ margin: 15 }}
          >
            Login
          </Button>
        </Card.Body>
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
