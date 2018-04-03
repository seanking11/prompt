import React, { Component } from 'react'
import { View, Animated, AsyncStorage } from 'react-native'
import { ImagePicker } from 'expo'
import { Button } from 'antd-mobile'
import { MyAppText, Avatar } from '../common'

const DURATION = 500

const styles = {
  containerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameStyle: {
    fontSize: 25,
    fontFamily: 'ProximaNovaBold',
    marginTop: 20,
    marginBottom: 20
  },
  headerTextStyle: {
    marginBottom: 40,
    fontSize: 25
  },
  infoTextStyle: {
    fontFamily: 'ProximaNovaRegularIt'
  }
}

class OnboardingScreen extends Component {
  state = {
    uploadedImage: '',
    userName: '',
    firstViewOpacity: new Animated.Value(1),
    secondViewOpacity: new Animated.Value(0),
    firstZIndex: 5,
    secondZIndex: 1
  }

  _handleUpload = () => {
    AsyncStorage.getItem('userName').then(user => {
      const obj = JSON.parse(user)
      const { firstName, lastName } = obj.data.createUser
      this.setState({ userName: `${firstName} ${lastName}` })
    })

    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(uploadedImage => {
      if (!uploadedImage.cancelled) {
        this.setState({
          uploadedImage,
          firstZIndex: 1,
          secondZIndex: 5
        })

        Animated.timing(
          this.state.firstViewOpacity,
          {
            toValue: 0,
            duration: DURATION
          }
        ).start(() => {
          Animated.timing(
            this.state.secondViewOpacity,
            {
              toValue: 1,
              duration: DURATION
            }
          ).start()
        })
      }
    })
  }

  _handleGetStarted = () => {
    this.props.navigation.navigate('auth')
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Animated.View style={[
          styles.containerStyle, {
            opacity: this.state.firstViewOpacity,
            zIndex: this.state.firstZIndex
          }]}
        >
          <MyAppText style={styles.headerTextStyle}>Upload a mugshot</MyAppText>
          <Avatar
            size={200}
            imgPath={require('../../../assets/avatars.gif')}
            style={styles.avatarStyles}
          />
          <Button type='primary' style={{ marginTop: 40 }}>
            <MyAppText onPress={() => this._handleUpload()}>Upload</MyAppText>
          </Button>
        </Animated.View>

        <Animated.View style={[
          styles.containerStyle, {
            opacity: this.state.secondViewOpacity,
            zIndex: this.state.secondZIndex
          }]}
        >
          <MyAppText style={styles.headerTextStyle}>Welcome</MyAppText>
          <Avatar
            size={200}
            img={this.state.uploadedImage.uri}
            style={styles.avatarStyles}
          />
          <MyAppText style={styles.nameStyle}>{this.state.userName}</MyAppText>
          <Button type='primary' style={styles.buttonStyle}>
            <MyAppText onPress={() => this._handleGetStarted()}>Login</MyAppText>
          </Button>
        </Animated.View>
      </View>
    )
  }
}

export default OnboardingScreen
