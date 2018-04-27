import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import createLikeMutation from '../mutations/createLike'
import deleteLikeMutation from '../mutations/deleteLike'


class LikeButton extends Component {
  state = {
    liked: this.props.likeId !== null,
    likeId: this.props.likeId
  }

  _handleOnPress = () => {
    if (this.state.liked) {
      this.props.deleteLike({
        variables: {
          id: this.state.likeId
        }
      })
      this.props.handleUnLike()
    } else {
      this.props.createLike({
        variables: {
          userId: this.props.user.id,
          postId: this.props.postId
        }
      }).then(response => this.setState({ likeId: response.data.createLike.id }))
      this.props.handleOnLike()
    }
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

const mapStateToProps = state => ({
  user: state.auth.user
})

export default compose(
  graphql(createLikeMutation, { name: 'createLike' }),
  graphql(deleteLikeMutation, { name: 'deleteLike' }),
  connect(mapStateToProps, null)
)(LikeButton)
