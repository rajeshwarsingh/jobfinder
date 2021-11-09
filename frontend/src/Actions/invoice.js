import { createInvoiceApi, updateInvoiceApi, patchInvoiceApi, deleteInvoiceApi, getInvoicesApi, getInvoiceByIdApi } from '../Api'

export function createInvoice (body, cb) {
  createInvoiceApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function updateInvoice (invoicesId, body, cb) {
  updateInvoiceApi(invoicesId, body)
    .then(response => {
      if (response.status === 204) return invoicesId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchInvoice (postId, body, cb) {
  patchInvoiceApi(postId, body)
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

export function getInvoices (filter, cb) {
  getInvoicesApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getInvoiceById (invoicesId, filter, cb) {
  getInvoiceByIdApi(invoicesId, filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deleteInvoice (invoicesId, cb) {
  deleteInvoiceApi(invoicesId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
