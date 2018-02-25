import React, { Component } from 'react'
import { View, Text } from 'react-native'

class FeedScreen extends Component {
  static navigationOptions = {
    headerTitle: '2/24/18',
    headerLeft: <Text>Profile</Text>,
    headerRight: <Text>Add</Text>
  }

  render() {
    return (
      <View>
        <Text>FeedScreen</Text>
        <Text>FeedScreen</Text>
        <Text>FeedScreen</Text>
        <Text>FeedScreen</Text>
        <Text>FeedScreen</Text>
        <Text>FeedScreen</Text>
      </View>
    )
  }
}

export default FeedScreen
