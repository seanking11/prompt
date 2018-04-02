import React from 'react'
import { Image } from 'react-native'

const Avatar = ({
  borderColor,
  img,
  size = 50,
  style,
  ...rest
}) => {
  const image = img ? { uri: img } : require('../../../assets/userPlaceholder.png')
  return (
    <Image
      style={[{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: borderColor || 'transparent'
      }, style]}
      source={image}
      {...rest}
    />
  )
}

export default Avatar
