import React from 'react'
import { View, Image, Dimensions, Text } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
import Card from './common/Card'
import Avatar from './common/Avatar'

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
    overflow: 'hidden'
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
    fontWeight: '600'
  },
  likesText: {
    color: '#fff',
    fontSize: 13,
    fontStyle: 'italic'
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

const Post = ({ post }) => (
  <View style={{ flex: 1 }}>
    <Card style={styles.card}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: post.file.url }}
      />

      <LinearGradient colors={['transparent', '#181818']} style={styles.infoBox}>
        <View style={styles.container}>
          <Avatar
            size={35}
            img='http://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png'
            style={styles.avatar}
          />
          <View style={{ marginRight: 'auto' }}>
            <Text style={styles.userText}>{`${post.user.firstName} ${post.user.lastName}`}</Text>
            <Text style={styles.likesText}>{post.caption}</Text>
          </View>
          <Icon name='heart-o' size={25} color='#fff' />
        </View>
      </LinearGradient>
    </Card>
  </View>
)


export default Post
