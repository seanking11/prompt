import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { graphql } from 'react-apollo'
import Post from './Post'
import allPostsQuery from '../queries/allPosts'

class PostsList extends Component {
  componentWillMount() {
    console.log('WillMount', this.props)
  }

  render() {
    return (
      <ScrollView>
        {this.props.data.allPosts && (
          this.props.data.allPosts.map(post => (
            <Post
              key={post.caption}
              post={post}
            />
          ))
        )}
      </ScrollView>
    )
  }
}

export default graphql(allPostsQuery)(PostsList)
