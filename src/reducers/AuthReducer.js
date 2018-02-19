import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types'

const initialState = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.email }
    case PASSWORD_CHANGED:
      return { ...state, password: action.password }
    case USERNAME_CHANGED:
      return { ...state, username: action.username }
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...initialState, user: action.user }
    case LOGIN_USER_FAIL:
    console.log('action:', action.error.toString());
      return {
        ...state,
        error: action.error.toString().substring(7),
        password: '',
        loading: false
      }
    default:
      return state
  }
}
