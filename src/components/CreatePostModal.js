import React, { Component } from 'react'
import {
  View,
  Button,
  Image,
  Modal,
  Dimensions
} from 'react-native'
import { InputItem } from 'antd-mobile'
import { DismissKeyboard } from './common'

const { width } = Dimensions.get('window')

const DismissKeyboardView = DismissKeyboard(View)

class CreatePostModal extends Component {
  state = {
    caption: ''
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
          <Button title='Close' onPress={() => this.props.closeModal()} />
        </DismissKeyboardView>
      </Modal>
    )
  }
}

export default CreatePostModal
