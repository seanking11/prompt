import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, View } from 'react-native'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MyAppText } from './common'
import Post from './Post'
import allPostsFromUserQuery from '../queries/allPostsFromUser'

let id

class ProfilePostsList extends Component {
  componentWillMount() {
    id = this.props.user.id
  }

  _renderPosts = () => {
    if (this.props.data.allPosts) {
      if (this.props.data.allPosts.length === 0) {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon name='frown-o' size={125} color='#808080' />
            <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 25, color: '#606060' }}>
              No posts today!
            </MyAppText>
          </View>
        )
      }

      return (
        <ScrollView>
          {this.props.data.allPosts.map(post => (
            <Post
              key={post.caption}
              post={post}
            />
          ))}
        </ScrollView>
      )
    }

    return <ActivityIndicator animating />
  }

  render() {
    return (
      this._renderPosts()
    )
  }
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const mapStateToProps = state => ({
  user: state.auth.user
})

export default compose(
  connect(mapStateToProps, null),
  graphql(allPostsFromUserQuery, {
    options: () => ({ variables: { userId: this.props.user.id } })
  })
)(ProfilePostsList)
