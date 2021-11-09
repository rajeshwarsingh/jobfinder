import { createServiceApi, updateServiceApi, patchServiceApi, deleteServiceApi, getServicesApi, countServicesApi, getServiceByIdApi } from '../Api'

export function createService (body, cb) {
  createServiceApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateService (servicesId, body, cb) {
  updateServiceApi(servicesId, body)
    .then(response => {
      if (response.status === 204) return servicesId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchService (postId, body, cb) {
  patchServiceApi(postId, body)
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

export function getServices (filter, cb) {
  getServicesApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function countServices (filter, cb) {
  countServicesApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getServiceById (servicesId, filter, cb) {
  getServiceByIdApi(servicesId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteService (servicesId, cb) {
  deleteServiceApi(servicesId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
