import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createUserProposalApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/user-proposals`, requestOptions)
}

export function updateUserProposalApi (userProposalId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/user-proposals/${userProposalId}`, requestOptions)
}

export function patchUserProposalApi (userId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/user-proposals/${userId}`, requestOptions)
}

export function changeUserProposalStatusApi (userProposalId, body) {
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

  return fetch(`${baseUrl}/user-proposals/${userProposalId}`, requestOptions)
}

export function getUserProposalApi (filter) {
  const url = new URL(`${baseUrl}/user-proposals`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function getUserProposalByIdApi (userProposalId) {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/user-proposals/${userProposalId}`, requestOptions)
}

export function deleteUserProposalApi (userProposalId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }

  return fetch(`${baseUrl}/user-proposals/${userProposalId}`, requestOptions)
}
