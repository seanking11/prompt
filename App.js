import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { ApolloProvider } from 'react-apollo'
import LoginScreen from './src/components/LoginScreen'
import reducers from './src/reducers'
import client from './src/client'

// Log network requests
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

const store = createStore(
  reducers,
  {},
  applyMiddleware(ReduxThunk, promiseMiddleware)
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoginScreen />
          </View>
        </ApolloProvider>
      </Provider>
    )
  }
}
