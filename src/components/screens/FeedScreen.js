import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'

class FeedScreen extends Component {
  static navigationOptions = {
    headerTitle: new Date().toLocaleDateString(),
    headerLeft: <Text onPress={() => AsyncStorage.removeItem('token')}>Profile</Text>,
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
