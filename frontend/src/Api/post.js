import ls from 'local-storage'
import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createPostApi (body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  body.view = '0'
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }
  console.log('final :', requestOptions)
  return fetch(`${baseUrl}/posts`, requestOptions)
}

export function updatePostApi (postId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/posts/${postId}`, requestOptions)
}

export function patchPostApi (postId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/posts/${postId}`, requestOptions)
}

export function getPostsApi (filter) {
  filter.where = filter.where ? filter.where : {}

  // if (filter) {
  //   filter.where.block = { nin: [ls.get('userId')] }
  // }

  const url = new URL(`${baseUrl}/posts`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function countPostsApi (filter) {
  const url = new URL(`${baseUrl}/posts/count`)
  url.search = new URLSearchParams({ where: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getPostByIdApi (postId, filter) {
  // if(!filter.where) filter.where = {}
  // filter.where.block = { "nin": [ls.get('userId')]}

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/posts/${postId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function deletePostApi (postId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/posts/${postId}`, requestOptions)
}
