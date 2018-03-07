import React, { Component } from 'react'
import { View, Text, AsyncStorage, Image, Button } from 'react-native'
import { ImagePicker } from 'expo'

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

  state = {
    image: {}
  }

  savePhoto = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(image => {
      this.setState({ image })
    })
  }

  render() {
    return (
      <View>
        <Button onPress={() => this.savePhoto()} title='Photo' />
        {!this.state.image.uri ? <Text>No Image</Text> : (
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: this.state.image.uri }}
          />
        )}

      </View>
    )
  }
}

export default FeedScreen
