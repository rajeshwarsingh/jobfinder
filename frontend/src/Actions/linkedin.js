import { createLinkedinApi, updateLinkedinApi, patchLinkedinApi, deleteLinkedinApi, getLinkedinsApi, getLinkedinByIdApi } from '../Api'

export function createLinkedin (body, cb) {
  createLinkedinApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateLinkedin (linkedinsId, body, cb) {
  updateLinkedinApi(linkedinsId, body)
    .then(response => {
      if (response.status === 204) return linkedinsId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchLinkedin (postId, body, cb) {
  patchLinkedinApi(postId, body)
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

export function getLinkedins (filter, cb) {
  getLinkedinsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getLinkedinById (linkedinsId, filter, cb) {
  getLinkedinByIdApi(linkedinsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteLinkedin (linkedinsId, cb) {
  deleteLinkedinApi(linkedinsId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
