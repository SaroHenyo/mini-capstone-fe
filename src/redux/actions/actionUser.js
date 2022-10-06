import { put, post } from '../../utilities/https'

export const registerUser = (newUserDetails) => {
  const url = '/user/signup'
  return new Promise((resolve, reject) => {
    const promise = put(url, newUserDetails)
    promise
      .then((response) => {
        resolve({
          type: 'REGISTER_USER',
          payload: response,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const loginUser = (activeUserDetails) => {
  const url = '/user/login'
  return new Promise((resolve, reject) => {
    const promise = post(url, activeUserDetails)
    promise
      .then((response) => {
        resolve({
          type: 'LOGIN_USER',
          payload: response,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const loginUserViaProvider = (email) => {
  const url = `/user/loginByProvider/${email}`
  return new Promise((resolve, reject) => {
    const promise = post(url)
    promise
      .then((response) => {
        resolve({
          type: 'LOGIN_USER',
          payload: response,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT_USER',
    })
  }
}
