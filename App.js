import React, { Component } from 'react'
import { Font, AppLoading } from 'expo'
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

  async componentDidMount() {
    await Font.loadAsync({
      ProximaNovaRegular: require('./assets/fonts/ProximaNovaRegular.otf'),
      ProximaNovaRegularIt: require('./assets/fonts/ProximaNova-RegularIt.otf'),
      ProximaNovaBold: require('./assets/fonts/ProximaNovaBold.otf')
    }).then(() => this.setState({ fontLoaded: true }))
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

    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          {this.state.fontLoaded ? <MainNavigator /> : <AppLoading />}
        </ApolloProvider>
      </Provider>
    )
  }
}
