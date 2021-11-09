import { createHiremngrApi, updateHiremngrApi, deleteHiremngrApi, getHiremngrApi, getHirmngrByIdApi } from '../Api'

export function createHiremngr (body, cb) {
  createHiremngrApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateHiremngr (hireMngrId, body, cb) {
  updateHiremngrApi(hireMngrId, body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getHiremngr (cb) {
  getHiremngrApi()
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getHirmngrById (hireMngrId, cb) {
  getHirmngrByIdApi(hireMngrId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteHiremngr (hireMngrId, cb) {
  deleteHiremngrApi(hireMngrId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
