import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function addFavouriteUserApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/favourite-users`, requestOptions)
}

export function updateFavouriteUserApi (favouriteUserId, body) {
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

  return fetch(`${baseUrl}/favourite-users/${favouriteUserId}`, requestOptions)
}

export function getFavouriteUserApi (filter) {
  const url = new URL(`${baseUrl}/favourite-users`)
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

export function getFavouriteUserByIdApi (favouriteUserId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/favourite-users/${favouriteUserId}`, requestOptions)
}

export function deleteFavouriteUserApi (favouriteUserId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/favourite-users/${favouriteUserId}`, requestOptions)
}
