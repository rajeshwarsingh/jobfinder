import { createRatingApi, updateRatingApi, patchRatingApi, deleteRatingApi, getRatingsApi, getRatingByIdApi } from '../Api'

export function createRating (body, cb) {
  createRatingApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateRating (ratingsId, body, cb) {
  updateRatingApi(ratingsId, body)
    .then(response => {
      if (response.status === 204) return ratingsId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchRating (postId, body, cb) {
  patchRatingApi(postId, body)
    .then(response => {
      if (response.status === 204) return postId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getRatings (filter, cb) {
  getRatingsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getRatingById (ratingsId, filter, cb) {
  getRatingByIdApi(ratingsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteRating (ratingsId, cb) {
  deleteRatingApi(ratingsId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
