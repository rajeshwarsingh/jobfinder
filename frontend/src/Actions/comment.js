import { createCommentApi, updateCommentApi, patchCommentApi, deleteCommentApi, getCommentsApi, getCommentByIdApi } from '../Api'

export function createComment (body, cb) {
  createCommentApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateComment (commentsId, body, cb) {
  updateCommentApi(commentsId, body)
    .then(response => {
      if (response.status === 204) return commentsId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchComment (postId, body, cb) {
  patchCommentApi(postId, body)
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

export function getComments (filter, cb) {
  getCommentsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getCommentById (commentsId, filter, cb) {
  getCommentByIdApi(commentsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteComment (commentsId, cb) {
  deleteCommentApi(commentsId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
