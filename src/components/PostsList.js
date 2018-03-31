import React, { Component } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import Post from './Post'
import allPostsQuery from '../queries/allPosts'

class PostsList extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.data.allPosts ? (
          this.props.data.allPosts.map(post => (
            <Post
              key={post.caption}
              post={post}
            />
          ))
        ) : <ActivityIndicator animating />}
      </ScrollView>
    )
  }
}

const today = new Date()
today.setHours(0, 0, 0, 0)

export default graphql(allPostsQuery, {
  options: () => ({ variables: { fetchAfterDate: today.toISOString().slice(0, -1) } })
})(PostsList)
