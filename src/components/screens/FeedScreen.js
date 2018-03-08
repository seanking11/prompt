import React, { Component } from 'react'
import { View, Text, AsyncStorage, Image, Button } from 'react-native'
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import CreatePost from '../CreatePost'

const logout = navigation => {
  AsyncStorage.removeItem('token')
  navigation.navigate('auth')
}

class FeedScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: new Date().toLocaleDateString(),
    headerLeft: <Text onPress={() => logout(navigation)}>Logout</Text>,
    headerRight: <Icon name='plus' color='#000' size={20} style={{ marginRight: 10 }} />
  })

  state = {
    newPostImage: {},
    showPost: false
  }

  savePhoto = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(newPostImage => {
      this.setState({ newPostImage, showPost: true })
    })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button onPress={() => this.savePhoto()} title='Photo' />
        <Button onPress={() => this.setState({ showPost: !this.state.showPost })} title='Animate' />
        <CreatePost
          visible={this.state.showPost}
          image={this.state.newPostImage}
        />
      </View>
    )
  }
}

export default FeedScreen
