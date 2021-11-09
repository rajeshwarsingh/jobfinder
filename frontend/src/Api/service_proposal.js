import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createServiceProposalApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/service-proposals`, requestOptions)
}

export function updateServiceProposalApi (serviceProposalId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/service-proposals/${serviceProposalId}`, requestOptions)
}

export function patchServiceProposalApi (serviceId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/service-proposals/${serviceId}`, requestOptions)
}

export function changeServiceProposalStatusApi (serviceProposalId, body) {
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

  return fetch(`${baseUrl}/service-proposals/${serviceProposalId}`, requestOptions)
}

export function getServiceProposalApi (filter) {
  const url = new URL(`${baseUrl}/service-proposals`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function getServiceProposalByIdApi (serviceProposalId) {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/service-proposals/${serviceProposalId}`, requestOptions)
}

export function deleteServiceProposalApi (serviceProposalId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }

  return fetch(`${baseUrl}/service-proposals/${serviceProposalId}`, requestOptions)
}
