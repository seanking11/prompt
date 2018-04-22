import React, { Component } from 'react'
import { View, Image, Dimensions, Text } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import FlipCard from 'react-native-flip-card'
import LikeButton from './LikeButton'
import { Avatar, MyAppText } from './common'

const DEVICE_WIDTH = Dimensions.get('window').width
const CALCULATED_WIDTH = DEVICE_WIDTH - 30

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
    borderRadius: 10,
    margin: 15,
    zIndex: 3
  },
  cardBack: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 25
  },
  infoBox: {
    position: 'absolute',
    width: CALCULATED_WIDTH,
    height: 60,
    bottom: 0,
    zIndex: 5,
    padding: 15,
    flexDirection: 'row'
  },
  captionBox: {
    position: 'absolute',
    width: CALCULATED_WIDTH,
    bottom: 0,
    zIndex: -1,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0
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
  },
  quote: {
    position: 'absolute',
    top: -10,
    left: -10
  }
}

class Post extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { post } = this.props
    return (
      <FlipCard
        style={{ borderWidth: 0 }}
        friction={20}
        // perspective={2000}
        flipHorizontal
        flipVertical={false}
        clickable
        alignHeight
        alignWidth
      >
        <View style={styles.card}>
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
                <MyAppText style={styles.likesText}>0 Likes</MyAppText>
              </View>
              <LikeButton />
            </View>
          </LinearGradient>
        </View>

        <View style={[styles.card, styles.cardBack, styles.shadow]}>
          <Icon name='quote-left' color='#F4F2F2' size={100} style={styles.quote} />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#000',
              marginBottom: 10
            }}
          >
            <MyAppText style={{ fontSize: 24, fontFamily: 'ProximaNovaBold' }}>The Backstory</MyAppText>
          </View>
          <MyAppText style={{ fontSize: 16 }}>{post.caption}</MyAppText>
        </View>
      </FlipCard>
    )
  }
}

export default Post
