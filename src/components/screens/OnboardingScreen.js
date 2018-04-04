import React, { Component } from 'react'
import { View, Animated, AsyncStorage } from 'react-native'
import { ImagePicker } from 'expo'
import { graphql } from 'react-apollo'
import { Button } from 'antd-mobile'
import { MyAppText, Avatar } from '../common'
import uploadUserImageMutation from '../../mutations/uploadUserImage'
import config from '../../config'

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
      const { firstName, lastName, id } = obj.data.createUser
      this.setState({ userName: `${firstName} ${lastName}`, userId: id })
    })

    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(uploadedImage => {
      if (!uploadedImage.cancelled) {
        this._setProfileImage(uploadedImage.uri)
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

  _setProfileImage = localUri => {
    const formData = new FormData()
    const fileName = new Date().getTime().toString()
    const data = {
      uri: localUri,
      name: `${fileName}.jpg`,
      type: 'image/jpeg'
    }
    formData.append('data', data)

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }

    fetch(config.fileUrl, options)
      .then(response => {
        console.log(response) // eslint-disable-line no-console
        return response.json()
      })
      .then(image => {
        const vars = {
          userUserId: this.state.userId,
          fileFileId: image.id
        }

        this.props.mutate({
          variables: vars
        })

          .then(() => {
            // Successfully uploaded image
            this.setState({ loading: false })
          })
          .catch(err => {
            this.setState({ loading: false })
            console.log('Error uploading image', err) // eslint-disable-line no-console
          })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log('Error uploading image', err) // eslint-disable-line no-console
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

export default graphql(uploadUserImageMutation)(OnboardingScreen)
