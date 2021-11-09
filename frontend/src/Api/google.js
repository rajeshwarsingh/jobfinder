import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createGoogleApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }
  return fetch(`${baseUrl}/googles`, requestOptions)
}

export function updateGoogleApi (googleId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update google body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/googles/${googleId}`, requestOptions)
}

export function patchGoogleApi (googleId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/googles/${googleId}`, requestOptions)
}

export function getGooglesApi (filter) {
  const url = new URL(`${baseUrl}/googles`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getGoogleByIdApi (googleId, filter) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/googles/${googleId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function deleteGoogleApi (googleId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/googles/${googleId}`, requestOptions)
}
