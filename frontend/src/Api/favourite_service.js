import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function addFavouriteServiceApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)
  const raw = JSON.stringify(body)
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/favourite-services`, requestOptions)
}

export function updateFavouriteServiceApi (favouriteServiceId, body) {
  const { postId = '', freelancerId = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify({ postId, freelancerId })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/favourite-services/${favouriteServiceId}`, requestOptions)
}

export function getFavouriteServiceApi (filter) {
  const url = new URL(`${baseUrl}/favourite-services`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function getFavouriteServiceByIdApi (favouriteServiceId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/favourite-services/${favouriteServiceId}`, requestOptions)
}

export function deleteFavouriteServiceApi (favouriteServiceId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/favourite-services/${favouriteServiceId}`, requestOptions)
}
