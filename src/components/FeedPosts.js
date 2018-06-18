import React, { Component } from 'react'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import { Button } from 'antd-mobile'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MyAppText } from './common'
import PostsList from './PostsList'
import allPostsQuery from '../queries/allPosts'

class FeedPosts extends Component {
  state = {
    refreshing: false
  }

  render() {
    if (this.props.data.allPosts) {
      if (this.props.data.allPosts.length === 0) {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon name='frown-o' size={125} color='#808080' />
            <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 25, color: '#606060' }}>
              No posts today!
            </MyAppText>
            <Button
              type='primary'
              onClick={() => this.props.onCTAButtonClick()}
              style={{ margin: 15 }}
            >
              <MyAppText>Be the first!</MyAppText>
            </Button>
          </View>
        )
      }
    }

    return (
      <PostsList
        posts={this.props.data.allPosts}
        onRefresh={this._refresh}
        refreshing={this.state.refreshing}
      />
    )
  }
}

const today = new Date()
today.setHours(0, 0, 0, 0)

export default graphql(allPostsQuery, {
  options: () => ({ variables: { fetchAfterDate: today.toISOString().slice(0, -1) } })
})(FeedPosts)
