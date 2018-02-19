import firebase from 'firebase'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'

export const emailChanged = email => ({
  type: EMAIL_CHANGED,
  email
})

export const passwordChanged = password => ({
  type: PASSWORD_CHANGED,
  password
})

export const usernameChanged = username => ({
  type: USERNAME_CHANGED,
  username
})

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, error })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    user
  })

  // Navigate user
}

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER })

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      console.log(error) // eslint-disable-line no-console
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch, error))
    })
}
