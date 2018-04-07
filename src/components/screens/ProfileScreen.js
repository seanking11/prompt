import React, { Component } from 'react'
import { View, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
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
    textAlign: 'center',
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
    headerTitle: (
      <MyAppText style={{ fontFamily: 'ProximaNovaBold', fontSize: 20 }}>
        Your Profile
      </MyAppText>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => logout(navigation)}>
        <Icon name='sign-out' color='#000' size={20} style={{ marginRight: 15, padding: 5 }} />
      </TouchableOpacity>
    )
  })

  render() {
    return (
      <View style={styles.containerStyles}>
        {this.props.user && (
          <View>
            <Avatar
              size={100}
              img={this.props.user.file ? this.props.user.file.url : ''}
            />
            <MyAppText style={styles.titleStyle}>{this.props.user.firstName} {this.props.user.lastName}</MyAppText>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(ProfileScreen)
