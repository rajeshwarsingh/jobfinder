import config from '../config'

const baseUrl = config.baseUrl

export function createHiremngrApi (body) {
  const { userId = '', registrationDate = '', location = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ userId, registrationDate, location })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/hiremngr`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function updateHiremngrApi (hireMngrId, body) {
  const { userId = '', registrationDate = '', location = '' } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ userId, registrationDate, location })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/hiremngr/${hireMngrId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function getHiremngrApi () {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/hiremngr`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function getHirmngrByIdApi (hireMngrId) {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/hiremngr/${hireMngrId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function deleteHiremngrApi (hireMngrId) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  }

  return fetch(`${baseUrl}/hiremngr/${hireMngrId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}
