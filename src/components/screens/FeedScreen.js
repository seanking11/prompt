import React, { Component } from 'react'
import { View, Text, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native'
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql } from 'react-apollo'
import PostsList from '../PostsList'
import CreatePostModal from '../CreatePostModal'
import query from '../../queries/allPosts'

const logout = navigation => {
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('loggedInUserId')
  navigation.navigate('auth')
}

class FeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: new Date().toLocaleDateString(),
      headerLeft: <Text onPress={() => logout(navigation)}>Logout</Text>,
      headerRight: (
        <TouchableOpacity onPress={() => params.savePhoto()}>
          <Icon name='plus' color='#000' size={20} style={{ marginRight: 15, padding: 5 }} />
        </TouchableOpacity>
      )
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
        <StatusBar
          animated
          hidden={this.state.modalVisibile}
        />
        <PostsList />

        <CreatePostModal
          visible={this.state.modalVisibile}
          image={this.state.newPostImage}
          closeModal={() => this.setState({ modalVisibile: false })}
        />
      </View>
    )
  }
}

export default graphql(query)(FeedScreen)
