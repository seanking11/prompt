import React, { Component } from 'react'
import { View, Text, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native'
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql } from 'react-apollo'
import FAB from 'react-native-fab'
import { Modal as PromptModal } from 'antd-mobile'
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
    createPostModalVisible: false,
    promptModalVisibile: false
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
        this.setState({ newPostImage, createPostModalVisible: true })
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
          hidden={this.state.createPostModalVisible}
        />

        <PostsList />

        <FAB
          buttonColor='#000'
          iconTextColor='#FFFFFF'
          onClickAction={() => this.setState({ promptModalVisibile: true })}
          iconTextComponent={<Icon name='lightbulb-o' color='#000' size={20} />}
        />

        <PromptModal
          visible={this.state.promptModalVisibile}
          transparent
          title={<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Today's Prompt</Text>}
          footer={[{
            text: 'Ok',
            onPress: () => this.setState({ promptModalVisibile: false })
          }]}
        >
          <View>
            <Text style={{ textAlign: 'center', marginTop: 15 }}>Make something big look small</Text>
          </View>
        </PromptModal>

        <CreatePostModal
          visible={this.state.createPostModalVisible}
          image={this.state.newPostImage}
          closeModal={() => this.setState({ createPostModalVisible: false })}
        />
      </View>
    )
  }
}

export default graphql(query)(FeedScreen)
