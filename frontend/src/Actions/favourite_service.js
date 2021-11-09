import { addFavouriteServiceApi, updateFavouriteServiceApi, deleteFavouriteServiceApi, getFavouriteServiceApi, getFavouriteServiceByIdApi } from '../Api'

export function addFavouriteService (body, cb) {
  addFavouriteServiceApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateFavouriteService (favouriteServiceId, body, cb) {
  updateFavouriteServiceApi(favouriteServiceId, body)
    .then(response => {
      if (response.status === 204) return favouriteServiceId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFavouriteService (filter, cb) {
  getFavouriteServiceApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFavouriteServiceById (favouriteServiceId, cb) {
  getFavouriteServiceByIdApi(favouriteServiceId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteFavouriteService (favouriteServiceId, cb) {
  deleteFavouriteServiceApi(favouriteServiceId)
    .then(response => {
      if (response.status === 204) return favouriteServiceId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
