import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

const { width, height } = Dimensions.get('window')

class CardModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => console.log('Pressed')}>
          <View>
            <Text>Hi the width is {width} and height is {height}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  }
}

export default CardModal
