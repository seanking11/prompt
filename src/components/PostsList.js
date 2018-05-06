import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, View, RefreshControl } from 'react-native'
import { graphql } from 'react-apollo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MyAppText } from './common'
import Post from './Post'
import allPostsQuery from '../queries/allPosts'

class PostsList extends Component {
  state = {
    refreshing: false
  }

  _refresh = () => {
    this.setState({ refreshing: true })
    this.props.data.refetch()
      .then(() => this.setState({ refreshing: false }))
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refresh}
            />
          }
        >
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

export default graphql(allPostsQuery, {
  options: () => ({ variables: { fetchAfterDate: today.toISOString().slice(0, -1) } })
})(PostsList)
