import React from 'react'
import { View } from 'react-native'

const styles = {
  containerStyles: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    borderRadius: 10,
    elevation: 1,
    margin: 15
  }
}

const Card = props => (
  <View style={[styles.containerStyles, props.style]}>
    {props.children}
  </View>
)

export default Card
