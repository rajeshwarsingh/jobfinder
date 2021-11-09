import config from '../config'
import { getCookieByName } from '../utility/index'
const baseUrl = config.baseUrl

export function createJobApi (body) {
  const {
    hireMngrId = '',
    companyName = '',
    title = '',
    location = '',
    jobFunType = '',
    empType = '',
    compIndus = '',
    seniority = '',
    description = '',
    skills = '',
    files = []
  } = body

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const raw = JSON.stringify({
    hireMngrId,
    companyName,
    title,
    location,
    jobFunType,
    empType,
    compIndus,
    seniority,
    description,
    skills,
    files
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }
  console.log('final :', requestOptions)
  return fetch(`${baseUrl}/jobs`, requestOptions)
}

export function updateJobApi (jobId, body) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log('check update post body:', body)
  const raw = JSON.stringify(body)

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw
  }

  return fetch(`${baseUrl}/jobs/${jobId}`, requestOptions)
}

export function getJobsApi (filter) {
  const url = new URL(`${baseUrl}/jobs`)
  url.search = new URLSearchParams({ filter: JSON.stringify(filter) })

  const requestOptions = {
    method: 'GET'
  }
  return fetch(url, requestOptions)
}

export function getJobByIdApi (jobId) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `basic ${getCookieByName('verificationToken')}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  return fetch(`${baseUrl}/jobs/${jobId}`, requestOptions)
}

export function deleteJobApi (jobId) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseUrl}/jobs/${jobId}`, requestOptions)
}
