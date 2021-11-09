import { createServiceProposalApi, updateServiceProposalApi, patchServiceProposalApi, deleteServiceProposalApi, getServiceProposalApi, getServiceProposalByIdApi, changeServiceProposalStatusApi } from '../Api'

export function createServiceProposal (body, cb) {
  createServiceProposalApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateServiceProposal (ServiceProposalId, body, cb) {
  updateServiceProposalApi(ServiceProposalId, body)
    .then(response => {
      if (response.status === 204) return ServiceProposalId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchServiceProposal (ServiceProposalId, body, cb) {
  patchServiceProposalApi(ServiceProposalId, body)
    .then(response => {
      if (response.status === 204) return ServiceProposalId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function changeServiceProposalStatus (ServiceProposalId, body, cb) {
  changeServiceProposalStatusApi(ServiceProposalId, body)
    .then(response => {
      if (response.status === 204) return ServiceProposalId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getServiceProposal (filter, cb) {
  getServiceProposalApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getServiceProposalById (ServiceProposalId, cb) {
  getServiceProposalByIdApi(ServiceProposalId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteServiceProposal (ServiceProposalId, cb) {
  deleteServiceProposalApi(ServiceProposalId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
