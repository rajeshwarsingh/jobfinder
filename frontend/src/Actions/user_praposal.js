import { createUserProposalApi, updateUserProposalApi, patchUserProposalApi, deleteUserProposalApi, getUserProposalApi, getUserProposalByIdApi, changeUserProposalStatusApi } from '../Api'

export function createUserProposal (body, cb) {
  createUserProposalApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateUserProposal (UserProposalId, body, cb) {
  updateUserProposalApi(UserProposalId, body)
    .then(response => {
      if (response.status === 204) return UserProposalId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchUserProposal (UserProposalId, body, cb) {
  patchUserProposalApi(UserProposalId, body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function changeUserProposalStatus (UserProposalId, body, cb) {
  changeUserProposalStatusApi(UserProposalId, body)
    .then(response => {
      if (response.status === 204) return UserProposalId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getUserProposal (filter, cb) {
  getUserProposalApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getUserProposalById (UserProposalId, cb) {
  getUserProposalByIdApi(UserProposalId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteUserProposal (UserProposalId, cb) {
  deleteUserProposalApi(UserProposalId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
