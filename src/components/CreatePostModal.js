import React, { Component } from 'react'
import {
  View,
  Image,
  Modal,
  Dimensions,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import { InputItem, Button } from 'antd-mobile'
import { graphql } from 'react-apollo'
import Icon from 'react-native-vector-icons/FontAwesome'
import createPostMutation from '../mutations/createPost'
import query from '../queries/allPosts'
import { DismissKeyboard } from './common'
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
  }
}

class CreatePostModal extends Component {
  state = {
    caption: '',
    loggedInUserId: '',
    loading: false
  }

  componentWillMount() {
    AsyncStorage.getItem('loggedInUserId').then(loggedInUserId => this.setState({ loggedInUserId }))
  }

  _onCreatePostButtonPress = (localUri) => {
    if (this.state.caption === '') {
      this.setState({ error: 'Please add a caption.' })
    } else {
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

          const tempUserId = 'cje3ieb6nd2my0196xe1wf2qj'

          const vars = {
            caption: this.state.caption,
            fileId: this.state.uploadedImageId,
            userId: this.state.loggedInUserId,
            file: {
              name: `${this.state.uploadedImageId}-${tempUserId}`
            }
          }

          this.props.mutate({ variables: vars, refetchQueries: [{ query }] })
            .then(() => {
              // Successfully created POST
              this.setState({ caption: '', loading: false })
              this.props.closeModal()
            })
            .catch(err => {
              this.setState({ loading: false })
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
          />

          <Text style={{ fontSize: 18, color: 'red', alignSelf: 'center' }}>
            {this.state.error}
          </Text>

          <Button
            onClick={() => this._onCreatePostButtonPress(this.props.image.uri)}
            loading={this.state.loading}
            style={{ margin: 15 }}
          >
            Create Post
          </Button>
          <Button
            type='warning'
            onClick={() => this.props.closeModal()}
            style={{ margin: 15 }}
          >
            Close
          </Button>
        </DismissKeyboardView>
      </Modal>
    )
  }
}

export default graphql(createPostMutation)(CreatePostModal)
