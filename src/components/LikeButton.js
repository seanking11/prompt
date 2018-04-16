import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class LikeButton extends Component {
  state = {
    liked: false
  }

  _handleOnPress = () => {
    this.setState({ liked: !this.state.liked })
  }

  render() {
    const name = this.state.liked ? 'heart' : 'heart-o'
    return (
      <TouchableOpacity onPress={this._handleOnPress}>
        <Icon name={name} size={25} color='#fff' />
      </TouchableOpacity>
    )
  }
}

export default LikeButton
