import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createNotificationApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/notifications`, requestOptions)
}

export function updateNotificationApi (notificationId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/notifications/${notificationId}`, requestOptions)
}

export function patchNotificationApi (notificationId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/notifications/${notificationId}`, requestOptions)
}

export function getNotificationsApi (filter) {
  const url = new URL(`${baseUrl}/notifications`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getNotificationByIdApi (notificationId, filter) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/notifications/${notificationId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function findNotificationByUserIdApi (notificationId, filter) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/notificationsByUserId/${notificationId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function deleteNotificationApi (notificationId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/notifications/${notificationId}`, requestOptions)
}
