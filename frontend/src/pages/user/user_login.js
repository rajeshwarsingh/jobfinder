import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getUsers, setUserDetails, patchUser, login, createLinkedin, createGoogle } from '../../Actions/index'
import { setCookies, getCookieByName } from '../../utility/index'
import config from '../../config'
import GoogleLogin, { useGoogleLogout } from 'react-google-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { ToastContainer, toast } from 'react-toastify';
import qs from 'qs';
import { notify } from 'superagent'
var Spinner = require('react-spinkit');
var loadjs = require('loadjs');
const { baseFrontenUrl, googleSinin, LinkedinSinin, displayNameSettings } = config

export class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLogin: false,
      username: "",
      successful: false,
      msg: false,
      message: "",
      code: '',
      errorMessage: '',
      spinner: false,
    }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.responseGoogleErr = this.responseGoogleErr.bind(this)
  }

  notifyErr = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  notifySucc = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  // componentWillMount() {
  // 	loadjs(baseFrontenUrl+'/js/bootstrap-select.min.js');
  // 	loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
  // 	loadjs(baseFrontenUrl+'/js/chart.min.js');
  // 	loadjs(baseFrontenUrl+'/js/clipboard.min.js');
  // 	loadjs(baseFrontenUrl+'/js/counterup.min.js');
  // 	loadjs(baseFrontenUrl+'/js/counterup.min.js');
  // 	loadjs(baseFrontenUrl+'/js/custom.js');
  // 	loadjs(baseFrontenUrl+'/js/infobox.min.js');
  // 	loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
  // 	loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
  // 	loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
  // 	loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
  // 	loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
  // 	loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
  // 	loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
  // 	loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
  // 	loadjs(baseFrontenUrl+'/js/leaflet.min.js');
  // 	loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
  // 	loadjs(baseFrontenUrl+'/js/maps.js');
  // 	loadjs(baseFrontenUrl+'/js/markerclusterer.js');
  // 	loadjs(baseFrontenUrl+'/js/mmenu.min.js');
  // 	loadjs(baseFrontenUrl+'/js/simplebar.min.js');
  // 	loadjs(baseFrontenUrl+'/js/snackbar.js');
  // 	loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
  // }

  responseGoogle(response) {
    console.log('after login:', response);

    const { email = "", familyName = "", givenName = "", imageUrl = "", name = "" } = response.profileObj

    let body = {
      email,
      firstName: givenName,
      lastName: familyName,
      imageUrl,
      loginType: 'signIn',
    }

    createGoogle(body, (err, res) => {

      this.setState({ spinner: false })

      if (err) {
        console.log('unable to login!')
        this.notifyErr('Something went wrong!, please try again later.')
        return
      }
      const { type = "", token = "", userId = "" } = res

      if (type === 'new') {
        this.notifyErr('Not register, Please Sign up from likedin!')
        return
      } else {

        // Handle login here
        if (!token) {
          console.log('token not exist')
          this.notifyErr('Something went wrong!, please try again later.')
          return
        }

        setUserDetails(userId, () => { })
        patchUser(userId, { lastLogin: new Date() }, () => { })

        let date = new Date();
        date.setDate(date.getDate() + 10);
        setCookies('verificationToken', res.token, date); // set cookies alos
        this.props.history.push('/freelancer/posts?login=true&msg=login successfully')
        return
      }

    })
  }

  responseGoogleErr(err) {
    alert('responseGoogleErr unable to login!')
  }

  handleLinkedinSuccess = (data) => {

    this.setState({ spinner: true })
    let body = { code: data.code, loginType: 'signIn' }
    createLinkedin(body, (err, res) => {
      console.log("check create Linkedin user api:", err, res)
      this.setState({ spinner: false })

      if (err) {
        console.log('unable to login!')
        this.notifyErr('Something went wrong!, please try again later.')
        return
      }
      const { type = "", token = "", userId = "" } = res

      if (type === 'new') {
        this.notifyErr('Not register, Please Sign up from likedin!')
        return
      } else {

        // Handle login here
        if (!token) {
          console.log('token not exist')
          this.notifyErr('Something went wrong!, please try again later.')
          return
        }

        setUserDetails(userId, () => { })
        patchUser(userId, { lastLogin: new Date() }, () => { })

        let date = new Date();
        date.setDate(date.getDate() + 10);
        setCookies('verificationToken', res.token, date); // set cookies alos
        setTimeout(() => {
          let userDetails = JSON.parse(ls.get('userProfile'))
          if (userDetails.rate) return this.props.history.push('/freelancer/dashboard?login=true&msg=login successfully')

          this.props.history.push('/freelancer/dashboard?login=true&msg=login successfully')
          // this.props.history.push('/freelancer/posts?login=true&msg=login successfully')
          return
        }, 2000)

      }

    })
  }

  handleLinkedinFailure = (error) => {
    this.seteState({ spinner: false })
    console.log('unable to login', error)
    this.notifyErr('Something went wrong!, please try again later.')
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleLogin(type) {

    //validate email and passward field
    if (!this.state.email || !this.state.password) {
      this.notifyErr('Please check emal or password!')
      return
    }

    //create body
    const body = {
      email: this.state.email,
      password: this.state.password
    }

    //call login api
    login(body, (err, res) => {
      console.log('login result :', err, res)

      if (err || (res && res.error)) {
        let msg = 'Unable to login, Please try again later.'
        msg = res.error && res.error.statusCode && res.error.statusCode === 401 && res.error.message ? res.error.message :
          res.error && res.error.statusCode && res.error.statusCode === 422 && Array.isArray(res.error.details) && res.error.details.length && res.error.details[0].message ? res.error.details[0].message :
            msg

        return this.notifyErr(msg)
      }

      if (res && res.token) {
        let date = new Date();
        date.setDate(date.getDate() + 10);
        setCookies('verificationToken', res.token, date); // set cookies alos
      }

      this.props.history.push('/freelancer/posts?login=true&msg=login successfully')
      return
    })
  }

  componentDidMount() {
    console.log('***********************check1')
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search);
    }

    const { msg = '', register = false } = search
    console.log('***********************check2', register, search)
    if (register) {
      setTimeout(() => this.notifySucc(msg), 300)
      return
    }

    if (getCookieByName('verificationToken')) {
      console.log('token :', getCookieByName('verificationToken'))
      this.setState({ isLogin: true })
      this.props.history.push('/freelancer/dashboard')

    }
  }

  render() {
    return (<Fragment>
      {/* <!-- Titlebar */}
      {/* ================================================== --> */}
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <h2>Log In</h2>

              {/* <!-- Breadcrumbs --> */}
              <nav id="breadcrumbs" className="dark">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li>Log In</li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </div>


      {/* <!-- Page Content================================================== --> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-5 offset-xl-3">

            {this.state.spinner && <div style={{ display: "flex", justifyContent: "center" }}><div><Spinner style={{ alignContent: 'center' }} name="line-scale" color="blue" /></div></div>}
            <div className="login-register-page">
              {/* <!-- Welcome Text --> */}

              {this.state.isLogin && (<div className="welcome-text">
                <h3>Please choose</h3>
                <div style={{ alignItems: 'center' }}>
                  <Link className="button full-width button-sliding-icon ripple-effect margin-top-10" to='/freelancer/posts'>{displayNameSettings.freelancer} </Link>
                  <Link className="button full-width button-sliding-icon ripple-effect margin-top-10" to='/hiremngr/dashboard'>{displayNameSettings.hiremanager} </Link>
                </div>
              </div>)}

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              {/* Same as */}
              <ToastContainer />

              {!this.state.isLogin && (<div><div className="welcome-text">
                <h3>We're glad to see you again!</h3>
                <span>Don't have an account? <a href="/register">Sign Up!</a></span>
              </div>

                {/* <!-- Form --> */}
                {/* <form method="post" id="login-form">
                  <div className="input-with-icon-left">
                    <i className="icon-material-baseline-mail-outline"></i>
                    <input type="text" value={this.state.email} onChange={this.onEmailChange} className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
                  </div>

                  <div className="input-with-icon-left">
                    <i className="icon-material-outline-lock"></i>
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} className="input-text with-border" name="password" id="password" placeholder="Password" required />
                  </div>
                  <a href="/forgot_password" className="forgot-password">Forgot Password?</a>
                </form> */}

                {/* <!-- Button --> */}
                {/* <button className="button full-width button-sliding-icon ripple-effect margin-top-10" onClick={() => this.handleLogin('freelancer')}>Log In </button> */}
                <div style={{ width: "950px" }} className="social-login-buttons">
                  <LinkedIn
                    clientId={LinkedinSinin.clientId}
                    onFailure={this.handleLinkedinFailure}
                    onSuccess={this.handleLinkedinSuccess}
                    redirectUri={baseFrontenUrl + "/linkedin"}
                    scope='r_liteprofile r_emailaddress w_member_social'
                    renderElement={({ onClick, disabled }) => (
                      <button className="facebook-login ripple-effect" onClick={onClick} disabled={disabled}><i className="fa fa-linkedin"></i> Login via Linkedin</button>
                    )}
                  />
                </div>
                {/* <button className="button full-width button-sliding-icon ripple-effect margin-top-10" onClick={() => this.handleLogin('hiremanager')}>Hire Manager Log In </button> */}
                {/* <!-- Social Login --> */}
                {/* <div className="social-login-separator"><span>or</span></div> */}
                {/* <div className="social-login-buttons">
                  <LinkedIn
                    clientId={LinkedinSinin.clientId}
                    onFailure={this.handleLinkedinFailure}
                    onSuccess={this.handleLinkedinSuccess}
                    redirectUri={baseFrontenUrl + "/linkedin"}
                    scope='r_liteprofile r_emailaddress w_member_social'
                    renderElement={({ onClick, disabled }) => (
                      <button className="facebook-login ripple-effect" onClick={onClick} disabled={disabled}><i className="fa fa-linkedin"></i> Login via Linkedin</button>
                    )}
                  />
                  <GoogleLogin

                    clientId={googleSinin.clientId}
                    render={renderProps => (
                      <button className="google-login ripple-effect" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="icon-brand-google-plus-g"></i> Login via Google</button>
                    )}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogleErr}
                    cookiePolicy={'single_host_origin'}
                  />
                </div> */}
              </div>)}
            </div>

          </div>
        </div>
      </div>


      {/* <!-- Spacer --> */}
      <div className="margin-top-70"></div>
      {/* <!-- Spacer / End--> */}
    </Fragment>);
  }
}
