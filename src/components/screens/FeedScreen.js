import React, { Component } from 'react'
import { View, Text, AsyncStorage, Button } from 'react-native'
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import CreatePostModal from '../CreatePostModal'

const logout = navigation => {
  AsyncStorage.removeItem('token')
  navigation.navigate('auth')
}

class FeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: new Date().toLocaleDateString(),
      headerLeft: <Text onPress={() => logout(navigation)}>Logout</Text>,
      headerRight: <Icon name='plus' color='#000' size={20} style={{ marginRight: 10 }} onPress={() => params.savePhoto()} />
    }
  }

  state = {
    newPostImage: {},
    modalVisibile: false
  }

  componentDidMount() {
    this.props.navigation.setParams({ savePhoto: this.savePhoto })
  }

  savePhoto = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    }).then(newPostImage => {
      if (!newPostImage.cancelled) {
        this.setState({ newPostImage, modalVisibile: true })
      }
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
        <Button onPress={() => this.setState({ modalVisibile: true })} title='Modal' />

        <CreatePostModal
          visible={this.state.modalVisibile}
          image={this.state.newPostImage}
          closeModal={() => this.setState({ modalVisibile: false })}
        />
      </View>
    )
  }
}

export default FeedScreen
