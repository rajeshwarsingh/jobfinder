import { createPaymentApi,createPaymentsubscPlanApi, HandlepaypalSubscriptionApi,CancelPaypalSubscriptionApi, updatePaymentApi, patchPaymentApi, deletePaymentApi, getPaymentApi, getPaymentByIdApi, changePaymentStatusApi } from '../Api'

export function createPayment (body, cb) {
  createPaymentApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function createPaymentsubscPlan (body, cb) {
  createPaymentsubscPlanApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}



export function HandlepaypalSubscription (body, cb) {
  HandlepaypalSubscriptionApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function CancelPaypalSubscription (body, cb) {
  CancelPaypalSubscriptionApi(body)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}


export function updatePayment (PaymentId, body, cb) {
  updatePaymentApi(PaymentId, body)
    .then(response => {
      if (response.status === 204) return PaymentId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function patchPayment (PaymentId, body, cb) {
  patchPaymentApi(PaymentId, body)
    .then(response => {
      if (response.status === 204) return PaymentId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function changePaymentStatus (PaymentId, body, cb) {
  changePaymentStatusApi(PaymentId, body)
    .then(response => {
      if (response.status === 204) return PaymentId
    })
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getPayment (filter, cb) {
  getPaymentApi(filter)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function getPaymentById (PaymentId, cb) {
  getPaymentByIdApi(PaymentId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}

export function deletePayment (PaymentId, cb) {
  deletePaymentApi(PaymentId)
    .then(response => response.json())
    .then((result) => {
      cb(null, result)
    })
    .catch(err => {
      cb(err, null)
    })
}
