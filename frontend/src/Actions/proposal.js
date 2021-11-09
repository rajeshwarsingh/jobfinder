import { createProposalApi, updateProposalApi, deleteProposalApi, getProposalApi, getProposalByPostApi, getProposalByIdApi, changeProposalStatusApi } from '../Api'

export function createProposal (body, cb) {
  createProposalApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateProposal (proposalId, body, cb) {
  updateProposalApi(proposalId, body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function changeProposalStatus (proposalId, body, cb) {
  changeProposalStatusApi(proposalId, body)
    .then(response => {
      if (response.status === 204) return proposalId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getProposal (filter, cb) {
  getProposalApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getProposalByPost (postId, cb) {
  getProposalByPostApi(postId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getProposalById (proposalId, filter, cb) {
  getProposalByIdApi(proposalId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteProposal (proposalId, cb) {
  deleteProposalApi(proposalId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
