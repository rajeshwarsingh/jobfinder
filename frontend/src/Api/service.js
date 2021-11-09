import ls from 'local-storage'
import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createServiceApi (body) {
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
  return fetch(`${baseUrl}/services`, requestOptions)
}

export function updateServiceApi (serviceId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/services/${serviceId}`, requestOptions)
}

export function patchServiceApi (serviceId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/services/${serviceId}`, requestOptions)
}

export function getServicesApi (filter) {
  filter.where = filter.where ? filter.where : {}

  if (filter) {
    filter.where.block = { nin: [ls.get('userId')] }
  }

  const url = new URL(`${baseUrl}/services`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function countServicesApi (filter) {
  const url = new URL(`${baseUrl}/services/count`)
  url.search = new URLSearchParams({ where: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getServiceByIdApi (serviceId, filter) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const url = new URL(`${baseUrl}/services/${serviceId}`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(url, requestOptions)
}

export function deleteServiceApi (serviceId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/services/${serviceId}`, requestOptions)
}
