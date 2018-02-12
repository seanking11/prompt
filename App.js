import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import firebase from 'firebase'
import LoginScreen from './src/components/LoginScreen'
import reducers from './src/reducers'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, promiseMiddleware))

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBFB-hYLOOER4UNdOTgaws98v3oQKCZvPU',
      authDomain: 'prompt-1efbf.firebaseapp.com',
      databaseURL: 'https://prompt-1efbf.firebaseio.com',
      projectId: 'prompt-1efbf',
      storageBucket: 'prompt-1efbf.appspot.com',
      messagingSenderId: '471922845764'
    }

    firebase.initializeApp(config)
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoginScreen />
        </View>
      </Provider>
    )
  }
}
