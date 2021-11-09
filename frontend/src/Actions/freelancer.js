import { createFreelancerApi, updateFreelancerApi, deleteFreelancerApi, getFreelancerApi, getFreelancerByIdApi } from '../Api'

export function createFreelancer (body, cb) {
  createFreelancerApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateFreelancer (freelancerId, body, cb) {
  updateFreelancerApi(freelancerId, body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFreelancer (cb) {
  getFreelancerApi()
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFreelancerById (freelancerId, cb) {
  getFreelancerByIdApi(freelancerId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteFreelancer (freelancerId, cb) {
  deleteFreelancerApi(freelancerId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
