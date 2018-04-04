import React, { Component } from 'react'
import {
  View,
  Image,
  Modal,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import { InputItem, Button } from 'antd-mobile'
import { graphql } from 'react-apollo'
import Icon from 'react-native-vector-icons/FontAwesome'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native'
import createPostMutation from '../mutations/createPost'
import query from '../queries/allPosts'
import { DismissKeyboard, MyAppText } from './common'
import config from '../config'

const { width } = Dimensions.get('window')

const DismissKeyboardView = DismissKeyboard(View) // eslint-disable-line new-cap

const styles = {
  closeIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(55, 55, 55, .9)',
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyles: {
    ...InputItemStyle,
    input: {
      ...InputItemStyle.input,
      fontFamily: 'ProximaNovaRegular'
    }
  }
}

const today = new Date()
today.setHours(0, 0, 0, 0)

class CreatePostModal extends Component {
  state = {
    caption: '',
    loggedInUserId: '',
    loading: false
  }

  componentWillMount() {
    AsyncStorage.getItem('loggedInUser').then(loggedInUser => {
      const obj = JSON.parse(loggedInUser)
      this.setState({ loggedInUserId: obj.id })
    }).catch(err => console.log(err)) // eslint-disable-line no-console
  }

  _onCreatePostButtonPress = (localUri) => {
    if (this.state.caption === '') {
      this.setState({ error: 'Please add a caption.' })
    } else {
      Keyboard.dismiss()
      this.setState({ loading: true })
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
          this.setState({
            uploadedImageId: image.id
          })

          const vars = {
            caption: this.state.caption,
            fileId: this.state.uploadedImageId,
            userId: this.state.loggedInUserId,
            file: {
              name: `${this.state.uploadedImageId}-${this.state.loggedInUserId}`
            }
          }

          this.props.mutate({
            variables: vars,
            refetchQueries: [{
              query,
              variables: { fetchAfterDate: today.toISOString().slice(0, -1) }
            }]
          })

            .then(() => {
              // Successfully created POST
              this.setState({ caption: '', loading: false })
              this.props.closeModal()
            })
            .catch(err => {
              this.setState({ loading: false, error: 'Whoops! Could not create post. Please try again!' })
              console.log('Error creating post', err) // eslint-disable-line no-console
            })
        })
        .catch(err => {
          this.setState({ loading: false })
          console.log('Error uploading image', err) // eslint-disable-line no-console
        })
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType='slide'
        transparent={false}
      >
        <DismissKeyboardView style={{ position: 'relative' }}>
          <TouchableOpacity style={styles.closeIconContainer} onPress={() => this.props.closeModal()}>
            <Icon name='times' size={25} color='#fff' />
          </TouchableOpacity>
          <Image
            style={{ width, height: width }}
            source={{ uri: this.props.image.uri }}
          />
          <InputItem
            type='text'
            placeholder='Add a caption'
            onChangeText={caption => this.setState({ caption })}
            value={this.state.caption}
            error={this.state.error}
            styles={styles.inputStyles}
          />

          <MyAppText style={{ fontSize: 18, color: 'red', alignSelf: 'center' }}>
            {this.state.error}
          </MyAppText>

          <Button
            onClick={() => this._onCreatePostButtonPress(this.props.image.uri)}
            loading={this.state.loading}
            style={{ margin: 15 }}
          >
            <MyAppText>Create Post</MyAppText>
          </Button>
        </DismissKeyboardView>
      </Modal>
    )
  }
}

export default graphql(createPostMutation)(CreatePostModal)
