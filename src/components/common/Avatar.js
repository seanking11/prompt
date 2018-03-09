import React from 'react'
import { Image } from 'react-native'

const Avatar = ({ size = 50, img }) => (
  <Image
    style={{ height: size, width: size, borderRadius: size / 2 }}
    source={{ uri: img }}
  />
)

export default Avatar
