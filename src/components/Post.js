import React from 'react'
import { View, Image, Dimensions, Text } from 'react-native'
import Card from './common/Card'

const WIDTH = Dimensions.get('window').width

const styles = {
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10
  }
}

const Post = ({ post }) => (
  <View style={{ flex: 1 }}>
    <Card style={{ width: WIDTH - 30, height: 325 }}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: post.file.url }}
      />
      <Text>{post.caption}</Text>
    </Card>
  </View>
)


export default Post
