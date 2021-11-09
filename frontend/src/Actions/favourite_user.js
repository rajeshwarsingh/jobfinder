import { addFavouriteUserApi, updateFavouriteUserApi, deleteFavouriteUserApi, getFavouriteUserApi, getFavouriteUserByIdApi } from '../Api'

export function addFavouriteUser (body, cb) {
  addFavouriteUserApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateFavouriteUser (favouriteUserId, body, cb) {
  updateFavouriteUserApi(favouriteUserId, body)
    .then(response => {
      if (response.status === 204) return favouriteUserId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFavouriteUser (filter, cb) {
  getFavouriteUserApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFavouriteUserById (favouriteUserId, cb) {
  getFavouriteUserByIdApi(favouriteUserId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteFavouriteUser (favouriteUserId, cb) {
  deleteFavouriteUserApi(favouriteUserId)
    .then(response => {
      if (response.status === 204) return favouriteUserId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
