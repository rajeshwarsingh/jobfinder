import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createPaymentApi (body) {
  // const {
  //   postId = '',
  //   freelancerId = '',
  //   hireMngrId = '',
  //   proposalTime = '',
  //   paymentType = '',
  //   paymentAmount,
  //   currentProposalStatus = '',
  //   freelancerRequest = {},
  //   hiremngrRequest = {},
  //   finalProposalRequest = {},
  //   clientGrade = '',
  //   clientComment = '',
  //   freelancerGrade = '',
  //   freelancerComment = ''
  // } = body

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/payments`, requestOptions)
}

export function createPaymentsubscPlanApi (body) {
  
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/paymentsubscPlan`, requestOptions)
}

export function HandlepaypalSubscriptionApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/paypalSubscription`, requestOptions)
}

export function CancelPaypalSubscriptionApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/cancelPaypalSubscription`, requestOptions)
}

export function updatePaymentApi (paymentId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/payments/${paymentId}`, requestOptions)
}

export function patchPaymentApi (serviceId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/payments/${serviceId}`, requestOptions)
}

export function changePaymentStatusApi (paymentId, body) {
  const {
    currentProposalStatus = '',
    finalProposalRequest = {}
  } = body

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ currentProposalStatus, finalProposalRequest })

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/payments/${paymentId}`, requestOptions)
}

export function getPaymentApi (filter) {
  const url = new URL(`${baseUrl}/payments`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function getPaymentByIdApi (paymentId) {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/payments/${paymentId}`, requestOptions)
}

export function deletePaymentApi (paymentId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }

  return fetch(`${baseUrl}/payments/${paymentId}`, requestOptions)
}
