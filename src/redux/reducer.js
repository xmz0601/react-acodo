import { combineReducers } from 'redux'
import { RECEIVE_USER, RESET_USER } from './action-types'

const initUser = {}

function user(state = initUser, action) {
  console.log('user(): ', state, action)
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case RESET_USER:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  user
})
