import React, { Component } from 'react'
import { View, Image, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Avatar, MyAppText } from './common'

const DEVICE_WIDTH = Dimensions.get('window').width
const CALCULATED_WIDTH = DEVICE_WIDTH - 30
const DURATION = 500

const styles = {
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10
  },
  card: {
    width: CALCULATED_WIDTH,
    height: 325,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    borderRadius: 10,
    elevation: 1,
    margin: 15
  },
  infoBox: {
    position: 'absolute',
    width: CALCULATED_WIDTH,
    height: 60,
    bottom: 0,
    zIndex: 1,
    padding: 15,
    flexDirection: 'row'
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNovaBold'
  },
  likesText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'ProximaNovaRegularIt'
  },
  avatar: {
    marginRight: 10
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1
  }
}

class Post extends Component {
  state = {
    width: new Animated.Value(CALCULATED_WIDTH),
    margin: new Animated.Value(15),
    open: false
  }

  _onPostPress() {
    this.setState({ open: !this.state.open })
    Animated.spring(
      this.state.width,
      {
        toValue: this.state.open ? DEVICE_WIDTH : CALCULATED_WIDTH,
        duration: DURATION
      }
    ).start()
    Animated.spring(
      this.state.margin,
      {
        toValue: this.state.open ? 0 : 15,
        duration: DURATION
      }
    ).start()
  }

  render() {
    const { post } = this.props
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPressIn={() => this._onPostPress()}>
          <Animated.View style={[styles.card, { width: this.state.width, margin: this.state.margin }]}>
            <Image
              resizeMode='cover'
              style={styles.image}
              source={{ uri: post.file.url }}
            />

            <LinearGradient colors={['transparent', '#181818']} style={styles.infoBox}>
              <View style={styles.container}>
                <Avatar
                  size={35}
                  style={styles.avatar}
                  img={post.user.file.url}
                />
                <View style={{ marginRight: 'auto' }}>
                  <MyAppText style={styles.userText}>{`${post.user.firstName} ${post.user.lastName}`}</MyAppText>
                  <MyAppText style={styles.likesText}>{post.caption}</MyAppText>
                </View>
                <Icon name='heart-o' size={25} color='#fff' />
              </View>
            </LinearGradient>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default Post
