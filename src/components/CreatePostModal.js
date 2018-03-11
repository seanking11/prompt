import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  Modal,
  Dimensions
} from 'react-native'
import { Constants } from 'expo'

const { width } = Dimensions.get('window')

class CreatePostModal extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType='slide'
        transparent={false}
      >
        <View style={{ marginTop: Constants.statusBarHeight }}>
          <Image
            style={{ width, height: width }}
            source={{ uri: this.props.image.uri }}
          />
          <Button title='Close' onPress={() => this.props.closeModal()} />
        </View>
      </Modal>
    )
  }
}

export default CreatePostModal
