import React from 'react'
import { Image } from 'react-native'

const Avatar = ({
  borderColor,
  img,
  size = 50,
  style,
  ...rest
}) => (
  <Image
    style={[{
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: borderColor || 'transparent'
    }, style]}
    source={{ uri: img }}
    {...rest}
  />
)

export default Avatar
