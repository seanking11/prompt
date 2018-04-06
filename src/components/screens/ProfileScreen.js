import React, { Component } from 'react'
import { View, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MyAppText, Avatar } from '../common'

const { width } = Dimensions.get('window')

const styles = {
  containerStyles: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  titleStyle: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 20
  }
}

const logout = navigation => {
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('loggedInUser')
  navigation.navigate('auth')
}

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => logout(navigation)}>
        <Icon name='sign-out' color='#000' size={20} style={{ marginRight: 15, padding: 5 }} />
      </TouchableOpacity>
    )
  })

  componentDidMount() {
    console.log('Mounted. Props: ', this.props)
  }

  render() {
    return (
      <View style={styles.containerStyles}>
        <Avatar
          size={100}
        />
        <MyAppText style={styles.titleStyle}>Sean King</MyAppText>
      </View>
    )
  }
}

export default ProfileScreen
