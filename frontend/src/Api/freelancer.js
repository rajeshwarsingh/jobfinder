import config from '../config'

const baseUrl = config.baseUrl

export function createFreelancerApi (body) {
  const { userId = '', registrationDate = '', location = '', overview = '', profession = '', hasSkills = [] } = body
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ userId, registrationDate, location, overview, profession, hasSkills })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/freelancers`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function updateFreelancerApi (freelancerId, body) {
  const { userId = '', registrationDate = '', location = '', overview = '', profession = '', hasSkills = [] } = body

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({ userId, registrationDate, location, overview, profession, hasSkills })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/freelancers/${freelancerId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function getFreelancerApi () {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/freelancers`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function getFreelancerByIdApi (freelancerId) {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseUrl}/freelancers/${freelancerId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function deleteFreelancerApi (freelancerId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/freelancers/${freelancerId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}
