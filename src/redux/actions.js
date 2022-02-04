import { RECEIVE_USER, RESET_USER } from './action-types'

export const receiveUser = (user) => ({type: RECEIVE_USER, user})
export const resetUser = () => ({type: RESET_USER})
