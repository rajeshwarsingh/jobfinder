
import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createFollowApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }
  console.log('final :', requestOptions)
  return fetch(`${baseUrl}/follows`, requestOptions)
}

export function updateFollowApi (followId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update follow body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/follows/${followId}`, requestOptions)
}

export function patchFollowApi (followId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/follows/${followId}`, requestOptions)
}

export function getFollowsApi (filter) {
  const url = new URL(`${baseUrl}/follows`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getFollowByIdApi (followId, filter) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/follows/${followId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function deleteFollowApi (followId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/follows/${followId}`, requestOptions)
}
