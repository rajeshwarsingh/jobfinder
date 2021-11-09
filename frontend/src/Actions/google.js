import { createGoogleApi, updateGoogleApi, patchGoogleApi, deleteGoogleApi, getGooglesApi, getGoogleByIdApi } from '../Api'

export function createGoogle (body, cb) {
  createGoogleApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateGoogle (GooglesId, body, cb) {
  updateGoogleApi(GooglesId, body)
    .then(response => {
      if (response.status === 204) return GooglesId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchGoogle (postId, body, cb) {
  patchGoogleApi(postId, body)
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

export function getGoogles (filter, cb) {
  getGooglesApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getGoogleById (GooglesId, filter, cb) {
  getGoogleByIdApi(GooglesId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteGoogle (GooglesId, cb) {
  deleteGoogleApi(GooglesId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
