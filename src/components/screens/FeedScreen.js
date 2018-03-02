import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import CardList from '../CardList'

const logout = navigation => {
  AsyncStorage.removeItem('token')
  navigation.navigate('auth')
}

class FeedScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: new Date().toLocaleDateString(),
    headerLeft: <Text onPress={() => logout(navigation)}>Logout</Text>,
    headerRight: <Text>Add</Text>
  })

  render() {
    return (
      <View>
        <CardList />
      </View>
    )
  }
}

export default FeedScreen
