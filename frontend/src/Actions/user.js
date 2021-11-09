import { createUserApi, updateUserApi, patchUserApi, deleteUserApi, getUsersApi, countUsersApi, getUserByIdApi,blockUsersApi, loginApi, whoAmIAPI, resetPasswordApi, forgotPasswordApi } from '../Api'
// import { setCookies, getCookieByName } from '../utility/index'
import ls from 'local-storage'

export function setUserDetails (userId, cb) {
  getUserByIdApi(userId)
    .then(response => response.json())
    .then(res => {
      console.log('userprofile:', res)
      // let date = new Date()
      // date.setDate(date.getDate() + 10);
      ls.set('userProfile', JSON.stringify(res))
      ls.set('userId', res.id)
      // setCookies('userProfile', JSON.stringify(res), date); // set cookies alos
    })
    .catch(err => {
      console.log(err)
    })
}

export function createUser (body, cb) {
  createUserApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function login (body, cb) {
  loginApi(body)
    .then(response => response.json())
    .then((result) => {
      whoAmIAPI(result)
        .then(response => response.text())
        .then((userId) => {
          cb(null, result)
          setUserDetails(userId, () => {})
          patchUser(userId, { lastLogin: new Date() }, () => {})
        })
        .catch(err => {
          console.log('error in whomi api', err)
          cb(err)
        })
    })
    .catch(err => {
      cb(err, null)
    })
}

export function forgotPassword (body, cb) {
  forgotPasswordApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function resetPassword (body, cb) {
  resetPasswordApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateUser (userId, body, cb) {
  updateUserApi(userId, body)
    .then(response => {
      if (response.status === 204) return userId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchUser (userId, body, cb) {
  patchUserApi(userId, body)
    .then(response => {
      if (response.status === 204) return userId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getUsers (filter, cb) {
  getUsersApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function countUsers (filter, cb) {
  countUsersApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getUserById (userId, filter, cb) {
  getUserByIdApi(userId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function blockUsers (userId, filter, cb) {
  blockUsersApi(userId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}



export function deleteUser (userId, cb) {
  deleteUserApi(userId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
