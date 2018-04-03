import React, { Component } from 'react'
import { View, Animated } from 'react-native'
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
    userName: 'Sean King',
    firstViewOpacity: new Animated.Value(1),
    secondViewOpacity: new Animated.Value(0)
  }

  _handleUpload = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(uploadedImage => {
      if (!uploadedImage.cancelled) {
        this.setState({ uploadedImage })

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
    this.props.navigation.navigate('main')
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Animated.View style={[styles.containerStyle, { opacity: this.state.firstViewOpacity, zIndex: 5 }]}>
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

        <Animated.View style={[styles.containerStyle, { opacity: this.state.secondViewOpacity, zIndex: 1 }]}>
          <MyAppText style={styles.headerTextStyle}>Welcome</MyAppText>
          <Avatar
            size={200}
            img={this.state.uploadedImage.uri}
            style={styles.avatarStyles}
          />
          <MyAppText style={styles.nameStyle}>{this.state.userName}</MyAppText>
          <Button type='primary' style={styles.buttonStyle}>
            <MyAppText onPress={() => this._handleGetStarted()}>Get Started!</MyAppText>
          </Button>
        </Animated.View>
      </View>
    )
  }
}

export default OnboardingScreen
