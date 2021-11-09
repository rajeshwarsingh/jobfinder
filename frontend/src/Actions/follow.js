import { createFollowApi, updateFollowApi, patchFollowApi, deleteFollowApi, getFollowsApi, getFollowByIdApi } from '../Api'

export function createFollow (body, cb) {
  createFollowApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateFollow (followsId, body, cb) {
  updateFollowApi(followsId, body)
    .then(response => {
      if (response.status === 204) return followsId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchFollow (postId, body, cb) {
  patchFollowApi(postId, body)
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

export function getFollows (filter, cb) {
  getFollowsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFollowById (followsId, filter, cb) {
  getFollowByIdApi(followsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteFollow (followsId, cb) {
  deleteFollowApi(followsId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
