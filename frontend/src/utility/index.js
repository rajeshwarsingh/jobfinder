import ls from 'local-storage'
import socketIOClient from 'socket.io-client'
import config from '../config'
// const io = require("socket.io-client");
const { baseFrontenUrl,baseSocketUrl, displayNameSettings } = config

const ENDPOINT = baseSocketUrl
export function daysDiffernce (startDt, endDt) {
  const date1 = new Date(startDt)
  const date2 = new Date(endDt)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function addDays (date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function setCookies (name, value, days) {
  let expires = ''
  if (1) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
     expires = '; expires=' + date.toGMTString()
  } else {
    expires = ''
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}

export function getCookieByName (name) {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

export function removeCookieName (name) {
  const socket = socketIOClient(ENDPOINT , { query: `userId=${ls.get('userId')}` });
  
  socket.emit('logout', { userId: ls.get('userId') })
  
  setCookies(name, '', -1)
  ls.remove('userProfile')
  ls.remove('userId')
  ls.remove('lng')
  ls.remove('lat')
}
