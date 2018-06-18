import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import Post from './Post'

class PostsList extends Component {
  _renderPosts = () => {
    if (this.props.posts) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.props.onRefresh}
            />
          }
          contentContainerStyle={{ paddingBottom: 75 }}
        >
          {this.props.posts.map(post => (
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

export default PostsList
