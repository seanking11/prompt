import React, { Component } from 'react'
import { View, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native'
import { ImagePicker } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql } from 'react-apollo'
import FAB from 'react-native-fab'
import { Modal as PromptModal } from 'antd-mobile'
import { MyAppText } from '../common'
import PostsList from '../PostsList'
import CreatePostModal from '../CreatePostModal'
import fetchPrompt from '../../queries/fetchPrompt'

const logout = navigation => {
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('loggedInUserId')
  navigation.navigate('auth')
}

const HeaderTitle = () => (
  <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 20 }}>
    {new Date().toLocaleDateString()}
  </MyAppText>
)

class FeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: <HeaderTitle />,
      headerLeft: <MyAppText onPress={() => logout(navigation)} style={{ marginLeft: 15 }}>Logout</MyAppText>,
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
    const PromptSection = () => (
      <View>
        {this.props.data.Prompt ? (
          <View>
            <MyAppText style={{ textAlign: 'center', marginTop: 15, fontSize: 18 }}>
              {this.props.data.Prompt.title}
            </MyAppText>
            <MyAppText style={{ fontFamily: 'ProximaNovaRegularIt', marginTop: 10 }}>
              {this.props.data.Prompt.description}
            </MyAppText>
          </View>
        ) : <MyAppText style={{ textAlign: 'center', fontSize: 18 }}>No prompt today!</MyAppText>}
      </View>
    )

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
          title={<MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 20 }}>Today's Prompt:</MyAppText>}
          footer={[{
            text: <MyAppText>Got it!</MyAppText>,
            onPress: () => this.setState({ promptModalVisibile: false })
          }]}
        >
          <PromptSection />
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

const today = new Date()
today.setHours(0, 0, 0, 0)

export default graphql(fetchPrompt, {
  options: () => ({ variables: { promptLaunchDate: today.toISOString().slice(0, -1) } })
})(FeedScreen)
