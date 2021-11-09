import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createProposalApi(body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/proposals`, requestOptions)
}

export function updateProposalApi(proposalId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/proposals/${proposalId}`, requestOptions)
}

export function changeProposalStatusApi(proposalId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/proposals/${proposalId}`, requestOptions)
}

export function getProposalApi(filter) {
  const url = new URL(`${baseUrl}/proposals`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function getProposalByIdApi(proposalId, filter) {
  const url = new URL(`${baseUrl}/proposals/${proposalId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function getProposalByPostApi(postId) {
  const url = new URL(`${baseUrl}/proposalsByPost/${postId}`)
  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function deleteProposalApi(proposalId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }

  return fetch(`${baseUrl}/proposals/${proposalId}`, requestOptions)
}