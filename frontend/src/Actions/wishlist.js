import { addWishlistApi, updateWishlistApi, deleteWishlistApi, getWishlistApi, getWishlistByIdApi } from '../Api'

export function addWishlist (body, cb) {
  addWishlistApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateWishlist (wishlistId, body, cb) {
  updateWishlistApi(wishlistId, body)
    .then(response => {
      if (response.status === 204) return wishlistId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getWishlist (filter, cb) {
  getWishlistApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getWishlistById (wishlistId, cb) {
  getWishlistByIdApi(wishlistId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteWishlist (wishlistId, cb) {
  deleteWishlistApi(wishlistId)
    .then(response => {
      if (response.status === 204) return wishlistId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
