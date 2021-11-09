import { createJobApi, updateJobApi, deleteJobApi, getJobsApi, getJobByIdApi } from '../Api'

export function createJob (body, cb) {
  createJobApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateJob (JobId, body, cb) {
  updateJobApi(JobId, body)
    .then(response => {
      if (response.status === 204) return JobId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getJobs (filter, cb) {
  getJobsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getJobById (JobId, cb) {
  getJobByIdApi(JobId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteJob (JobId, cb) {
  deleteJobApi(JobId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
