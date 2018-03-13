import React, { Component } from 'react'
import {
  View,
  Button,
  Image,
  Modal,
  Dimensions,
  Text
} from 'react-native'
import { InputItem } from 'antd-mobile'
import { graphql } from 'react-apollo'
import createPostMutation from '../mutations/createPost'
import { DismissKeyboard } from './common'
import config from '../config'

const { width } = Dimensions.get('window')

const DismissKeyboardView = DismissKeyboard(View) // eslint-disable-line new-cap

class CreatePostModal extends Component {
  state = {
    caption: ''
  }

  _onCreatePostButtonPress = (localUri) => {
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

          const tempUserId = 'cje3ieb6nd2my0196xe1wf2qj'

          const vars = {
            caption: this.state.caption,
            fileId: this.state.uploadedImageId,
            userId: tempUserId, // grab from store later
            file: {
              name: `${this.state.uploadedImageId}-${tempUserId}`
            }
          }

          this.props.mutate({ variables: vars })
            .then(() => {
              // Successfully created POST
              this.props.closeModal()
            })
            .catch(err => console.log('Error creating post', err)) // eslint-disable-line no-console
        })
        .catch(err => console.log('Error uploading image', err)) // eslint-disable-line no-console
    }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType='slide'
        transparent={false}
      >
        <DismissKeyboardView>
          <Image
            style={{ width, height: width }}
            source={{ uri: this.props.image.uri }}
          />
          <InputItem
            type='text'
            placeholder='Add a caption'
            onChangeText={caption => this.setState({ caption })}
            value={this.state.caption}
          />
          <Button title='Create Post' onPress={() => this._onCreatePostButtonPress(this.props.image.uri)} />
          <Button title='Close' onPress={() => this.props.closeModal()} />
        </DismissKeyboardView>
      </Modal>
    )
  }
}

export default graphql(createPostMutation)(CreatePostModal)
