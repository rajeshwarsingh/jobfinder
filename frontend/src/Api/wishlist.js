import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function addWishlistApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/wishlists`, requestOptions)
}

export function updateWishlistApi (wishlistId, body) {
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

  return fetch(`${baseUrl}/wishlists/${wishlistId}`, requestOptions)
}

export function getWishlistApi (filter) {
  const url = new URL(`${baseUrl}/wishlists`)
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

export function getWishlistByIdApi (wishlistId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/wishlists/${wishlistId}`, requestOptions)
}

export function deleteWishlistApi (wishlistId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${getCookieByName('verificationToken')}`)
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/wishlists/${wishlistId}`, requestOptions)
}
