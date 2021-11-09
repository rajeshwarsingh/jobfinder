import ls from 'local-storage'
import config from '../config'
const baseUrl = config.baseUrl

export function loginApi (body) {
  const { email = '', password = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ email, password })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/users/login`, requestOptions)
}

export function resetPasswordApi (body) {
  const { email = '', password = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ email, password })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/users/password-reset`, requestOptions)
}

export function forgotPasswordApi (body) {
  const { email = '', password = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ email, password })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/users/password-forgot`, requestOptions)
}

export function createUserApi (body) {
  const { userName = '', password = '', email = '', firstName = '', lastName = '', isActive = true, type = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ userName, password, email, firstName, lastName, isActive, type })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/signup`, requestOptions)
}

export function updateUserApi (userId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/users/${userId}`, requestOptions)
}

export function patchUserApi (userId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/users/${userId}`, requestOptions)
}

export function getUsersApi (filter) {
  filter.where = filter.where ? filter.where : {}
  if (filter) {
    filter.where.block = { nin: [ls.get('userId')] }
  }

  const url = new URL(`${baseUrl}/users`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }

  return fetch(url, requestOptions)
}

export function countUsersApi (filter) {
  const url = new URL(`${baseUrl}/users/count`)
  url.search = new URLSearchParams({ where: JSON.stringify(filter) })
  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getUserByIdApi (userId, filter = {}) {
  const requestOptions = {
    method: 'GET'
  }
  const url = new URL(`${baseUrl}/users/${userId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })
  return fetch(url, requestOptions)
}

export function blockUsersApi (userId, filter = {}) {
  const requestOptions = {
    method: 'GET'
  }
  const url = new URL(`${baseUrl}/blockUsers/${userId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })
  return fetch(url, requestOptions)
}


export function deleteUserApi (userId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/users/${userId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function whoAmIAPI (result) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${result.token}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/whoAmI`, requestOptions)
}
