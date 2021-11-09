import { createFraudReportApi, updateFraudReportApi, patchFraudReportApi, deleteFraudReportApi, getFraudReportsApi, getFraudReportByIdApi } from '../Api'

export function createFraudReport (body, cb) {
  createFraudReportApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateFraudReport (fraudReportsId, body, cb) {
  updateFraudReportApi(fraudReportsId, body)
    .then(response => {
      if (response.status === 204) return fraudReportsId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchFraudReport (postId, body, cb) {
  patchFraudReportApi(postId, body)
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

export function getFraudReports (filter, cb) {
  getFraudReportsApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getFraudReportById (fraudReportsId, filter, cb) {
  getFraudReportByIdApi(fraudReportsId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteFraudReport (fraudReportsId, cb) {
  deleteFraudReportApi(fraudReportsId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
