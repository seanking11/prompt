import React, { Component } from 'react'
import { Animated, Image, Dimensions } from 'react-native'
import Card from './common/Card'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
const START_VALUE = 0
const END_VALUE = HEIGHT
const DURATION = 500

const styles = {
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10
  }
}

class CreatePost extends Component {
  state = {
    viewY: new Animated.Value(START_VALUE),
    visible: this.props.visible
  }

  componentWillMount() {
    Animated.timing(
      this.state.viewY,
      {
        toValue: END_VALUE,
        duration: DURATION
      }
    ).start()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true })
    }
    Animated.timing(this.state.viewY, {
      toValue: nextProps.visible ? START_VALUE : END_VALUE,
      duration: 300
    }).start(() => {
      this.setState({ visible: nextProps.visible })
    })
  }

  render() {
    return (
      <Animated.View
        style={{ top: this.state.viewY, flex: 1 }}
      >
        {this.state.visible ? this.props.children : null}
        <Card style={{ width: WIDTH - 30, height: 325 }}>
          <Image
            resizeMode='cover'
            style={styles.image}
            source={{ uri: this.props.image.uri }}
          />
        </Card>
      </Animated.View>
    )
  }
}

export default CreatePost
