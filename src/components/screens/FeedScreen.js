import React, { Component } from 'react'
import { View, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { ImagePicker, Permissions } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql, compose } from 'react-apollo'
import FAB from 'react-native-fab'
import { Modal as PromptModal } from 'antd-mobile'
import { MyAppText, Avatar } from '../common'
import PostsList from '../PostsList'
import CreatePostModal from '../CreatePostModal'
import fetchPrompt from '../../queries/fetchPrompt'

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
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('profile')}
        >
          <Avatar
            borderColor='#000'
            borderWidth={1}
            size={30}
            img={params.userPicture}
            style={{ marginLeft: 15 }}
          />
        </TouchableOpacity>
      ),
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

  componentWillMount() {
    let userPicture = ''
    if (this.props.user) {
      userPicture = this.props.user.file.url
    }
    this.props.navigation.setParams({
      savePhoto: this.savePhoto,
      userPicture
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.props.user) {
      if (nextProps.user.file.url !== this.props.user.file.url) {
        this.props.navigation.setParams({
          userPicture: nextProps.user.file.url || ''
        })
      }
    }
  }

  askPermissionsAsync = async () => (
    Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ])
  )

  savePhoto = async () => {
    const results = await this.askPermissionsAsync()
    if (results.some(({ status }) => status === 'granted')) {
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      }).then(newPostImage => {
        if (!newPostImage.cancelled) {
          this.setState({ newPostImage, createPostModalVisible: true })
        }
      }).catch(err => console.log(err)) // eslint-disable-line no-console
    }
  }

  render() {
    const PromptSection = () => (
      <View>
        {this.props.data.Prompt ? (
          <View>
            <MyAppText style={{ textAlign: 'center', marginTop: 15, fontSize: 18 }}>
              {this.props.data.Prompt.title}
            </MyAppText>
            <MyAppText style={{ textAlign: 'center', fontFamily: 'ProximaNovaRegularIt', marginTop: 10 }}>
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
          promptId={this.props.data.Prompt ? this.props.data.Prompt.id : null}
        />
      </View>
    )
  }
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const mapStateToProps = state => ({
  user: state.auth.user
})

export default compose(
  graphql(fetchPrompt, {
    options: () => ({ variables: { promptLaunchDate: today.toISOString().slice(0, -1) } })
  }),
  connect(mapStateToProps, null)
)(FeedScreen)
