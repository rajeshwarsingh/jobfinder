import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createLinkedinApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }
  return fetch(`${baseUrl}/linkedins`, requestOptions)
}

export function updateLinkedinApi (linkedinId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update linkedin body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/linkedins/${linkedinId}`, requestOptions)
}

export function patchLinkedinApi (linkedinId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/linkedins/${linkedinId}`, requestOptions)
}

export function getLinkedinsApi (filter) {
  const url = new URL(`${baseUrl}/linkedins`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getLinkedinByIdApi (linkedinId, filter) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/linkedins/${linkedinId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function deleteLinkedinApi (linkedinId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/linkedins/${linkedinId}`, requestOptions)
}
