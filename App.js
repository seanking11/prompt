import React, { Component } from 'react'
import { Font, AppLoading } from 'expo'
import { View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { ApolloProvider } from 'react-apollo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import reducers from './src/reducers'
import client from './src/client'
import {
  AuthScreen,
  ProfileScreen,
  FeedScreen
} from './src/components/screens'

// Log network requests
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

const store = createStore(
  reducers,
  {},
  applyMiddleware(ReduxThunk, promiseMiddleware)
)

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  state = {
    fontLoaded: false
  }

  _fetchFonts = () => {
    Font.loadAsync({
      ProximaNovaRegular: require('./assets/fonts/ProximaNovaRegular.otf'),
      ProximaNovaRegularIt: require('./assets/fonts/ProximaNova-RegularIt.otf'),
      ProximaNovaBold: require('./assets/fonts/ProximaNovaBold.otf')
    }).then(() => {
      this.setState({ fontLoaded: true })
    }).catch(err => console.log(err)) // eslint-disable-line no-console
  }

  render() {
    const MainNavigator = TabNavigator({ // eslint-disable-line
      auth: { screen: AuthScreen },
      main: {
        screen: StackNavigator({ // eslint-disable-line new-cap
          feed: { screen: FeedScreen },
          profile: { screen: ProfileScreen }
        }, {
          navigationOptions: {
            gesturesEnabled: false
          }
        })
      }
    },
    {
      initialRouteName: 'auth',
      navigationOptions: {
        tabBarVisible: false
      }
    }) // eslint-disable-line function-paren-newline

    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this._fetchFonts}
          onFinish={() => this.setState({ fontLoaded: true })}
          onError={e => console.log('error fetching fonts: ', e)}
        />
      )
    }

    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MainNavigator />
        </ApolloProvider>
      </Provider>
    )
  }
}
