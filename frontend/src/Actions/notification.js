import { createNotificationApi, updateNotificationApi,findNotificationByUserIdApi, patchNotificationApi, deleteNotificationApi, getNotificationsApi, getNotificationByIdApi } from '../Api'

export function createNotification (body, cb) {
  createNotificationApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateNotification (notificationsId, body, cb) {
  updateNotificationApi(notificationsId, body)
    .then(response => {
      if (response.status === 204) return notificationsId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchNotification (postId, body, cb) {
  patchNotificationApi(postId, body)
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

export function getNotifications (filter, cb) {
  getNotificationsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getNotificationById (notificationsId, filter, cb) {
  getNotificationByIdApi(notificationsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function findNotificationByUserId (notificationsId, filter, cb) {
  findNotificationByUserIdApi(notificationsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}



export function deleteNotification (notificationsId, cb) {
  deleteNotificationApi(notificationsId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
