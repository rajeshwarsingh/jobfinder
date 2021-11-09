
class Auth {
  constructor () {
    this.authenticated = false
    // console.log('auth constructor:', this.authenticated)
  }

  login (cb) {
    this.authenticated = true
    // console.log('auth login:', this.authenticated)
    cb()
  }

  logout (cb) {
    this.authenticated = false
    // console.log('auth login:', this.authenticated)
    cb()
  }

  isAuthenticated () {
    // console.log('auth isAuthenticated:', this.authenticated)
    return this.authenticated
  }
}

export default new Auth()
