import React, { Component } from 'react'
import { View, Dimensions, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ImagePicker } from 'expo'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import uploadUserImageMutation from '../../mutations/uploadUserImage'
import { MyAppText, Avatar } from '../common'
import config from '../../config'

const { width } = Dimensions.get('window')

const styles = {
  containerStyles: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  titleStyle: {
    fontFamily: 'ProximaNovaBold',
    textAlign: 'center',
    fontSize: 20
  }
}

const logout = navigation => {
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('loggedInUser')
  navigation.navigate('auth')
}

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 20 }}>
        Your Profile
      </MyAppText>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => logout(navigation)}>
        <Icon name='sign-out' color='#000' size={20} style={{ marginRight: 15, padding: 5 }} />
      </TouchableOpacity>
    )
  })

  state = {
    loading: false
  }

  _handleOnPress = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(uploadedImage => {
      if (!uploadedImage.cancelled) {
        this._setProfileImage(uploadedImage.uri)
        this.setState({ loading: true })
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
          userUserId: this.props.user.id,
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

  render() {
    return (
      <View style={styles.containerStyles}>
        {this.props.user && (
          <View>
            {!this.state.loading ? (
              <TouchableOpacity onPress={this._handleOnPress}>
                <Avatar
                  size={100}
                  img={this.props.user.file ? this.props.user.file.url : ''}
                />
              </TouchableOpacity>
            ) : <ActivityIndicator animating />}
            <MyAppText style={styles.titleStyle}>{this.props.user.firstName} {this.props.user.lastName}</MyAppText>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default compose(
  graphql(uploadUserImageMutation),
  connect(mapStateToProps, null)
)(ProfileScreen)
