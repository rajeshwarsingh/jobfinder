import ls from 'local-storage'
import React, { Fragment } from 'react'
import { getUsers, setUserDetails,patchUser,createUser, login, createLinkedin, createGoogle } from '../../Actions/index'
import { setCookies, getCookieByName } from '../../utility/index'
import config from '../../config'
import { v4 as uuidv4 } from 'uuid';
import GoogleLogin, { useGoogleLogout } from 'react-google-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import qs from 'qs'
var Spinner = require('react-spinkit');

const { baseFrontenUrl, googleSinin, LinkedinSinin } = config

export class UserRegister extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      rePassword:"",
      successful: false,
      msg: false,
      message: "",
      code: '',
      errorMessage: '',
      loader:false
    }
    
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this)
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

  responseGoogle(response) {
    this.setState({loader:true})

    const { email="", familyName="", givenName="", imageUrl="", name="" } = response.profileObj

    let body = {
      email,
      firstName: givenName,
      lastName: familyName,
      imageUrl,
    }
    
    createGoogle(body, (err, res) => {
      this.setState({loader:false})
      
      if (err) {
        alert('unable to login!')
        return
      }
      const { type = '', email= '', token= ''} = res

      if (type === 'registed') {
        this.notifySucc('Registered, Go to login!')
        return
      } else {
        this.notifyErr('Already registered, Go to login!')
        return
        
      }

    })
  }

  responseGoogleErr(err) {
    alert('unable to login!')
  }

  handleLinkedinSuccess = (data) => {
    
    this.setState({loader:true})
    let body = { code: data.code }
    // createLinkedin(body, (err, res) => {
    //   this.setState({loader:false})
      
    //   if (err) {
    //     alert('unable to login!')
    //     return
    //   }
    //   const { type = '', email= '', token= ''} = res

    //   if (type === 'registed') {
    //     this.notifySucc('Registered, Go to login!')
    //     return
    //   } else {
    //     this.notifyErr('Already registered, Go to login!')
    //     return
        
    //   }

    // })

    createLinkedin(body, (err, res) => {
      console.log("check create Linkedin user api:",err,res)
      this.setState({spinner:false})
      
      if (err) {
        console.log('unable to login!')
        this.notifyErr('Something went wrong!, please try again later.')
        return
      }
      const { type= "", token="", userId="" } = res

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

        setUserDetails(userId, ()=>{})
        patchUser(userId,{lastLogin:new Date()},()=>{})

        let date = new Date();
        date.setDate(date.getDate() + 10);
        setCookies('verificationToken', res.token, date); // set cookies alos
        setTimeout(()=>{
          let userDetails = JSON.parse(ls.get('userProfile'))
        if(userDetails.rate) return this.props.history.push('/freelancer/dashboard?login=true&msg=login successfully') 
        
        this.props.history.push('/freelancer/dashboard?login=true&msg=login successfully')
        return
        },2000)
        
      }

    })
  }

  handleLinkedinFailure = (error) => {
    console.log('unable to login', error)
    this.notifyErr('Something went wrong, Please try again!')
        return
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRePassword(e){
    this.setState({
      rePassword: e.target.value
    });
  }

  handleRegister(e) {
    
    //required filed
    if (!this.state.username || !this.state.email || !this.state.password) {
      let msg ="Username, email or password can't blank!"
        this.notifyErr(msg)
        return
    }
    
    //validate userId
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if(!this.state.username.match(letterNumber)){
        let msg ='Invalid User'
        this.notifyErr(msg)
        return
    }

    // password match
    if (this.state.password !== this.state.rePassword){
      let msg ="Repeat password not matched!"
        this.notifyErr(msg)
        return
    }

    //validate email
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))){
      let msg ="invalid email"
        this.notifyErr(msg)
        return
    }

    //start loader
    this.setState({loader:true})
    
    const body = {
      "id": uuidv4(),
      "userName": this.state.username,
      "email": this.state.email,
      "emailVerified": true,
      "verificationToken": `token${uuidv4()}`,
      "password": this.state.password,
      "online" : "Y"
    }

    let date = new Date();
    date.setDate(date.getDate() + 10);
    createUser(body, (err, res) => {
      //stop loader
      this.setState({loader:true})
      if(err){
        console.log('Error in register :', err)
        this.notifyErr("Unable to register, please try again later.")
        return
      }
      return this.props.history.push('/login?register=true&msg=Registered successfully, please login!')
    })
  }
  
  render() {

    console.log(this.state)
    const { code, errorMessage } = this.state;
    return (<Fragment>
      {/* <!-- Titlebar================================================== --> */}
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <h2>Register</h2>

              {/* <!-- Breadcrumbs --> */}
              <nav id="breadcrumbs" className="dark">
                <ul>
                  <li><a href="#">Home</a></li>
                  <li>Register</li>
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

            <div className="login-register-page">
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
              
              {this.state.loader && <div className="welcome-text">
                <Spinner name="line-scale" color="blue"/>
              </div>}
              {/* <!-- Welcome Text --> */}
              <div className="welcome-text">
                <h3 style={{ "fontSize": "26px" }}>Let's create your account!</h3>
                <span>Already have an account? <a href="/login">Log In!</a></span>
              </div>

              {/* <!-- Form --> */}
              {/* <form method="post" id="register-account-form">

                <div className="input-with-icon-left">
                <i className="icon-material-outline-account-circle"></i>
                  <input type="text" className="input-text with-border" value={this.state.username} onChange={this.onChangeUsername} name="username" placeholder="Username" />
                </div>

                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline"></i>
                  <input type="text" className="input-text with-border" value={this.state.email} onChange={this.onChangeEmail} name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required />
                </div>

                <div className="input-with-icon-left" value={this.state.password} onChange={this.onChangePassword} title="Should be at least 8 characters long" data-tippy-placement="bottom">
                  <i className="icon-material-outline-lock"></i>
                  <input type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Password" required />
                </div>

                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock"></i>
                  <input type="password" className="input-text with-border" value={this.state.rePassword} onChange={this.onChangeRePassword} name="password-repeat-register" id="password-repeat-register" placeholder="Repeat Password" required />
                </div>
              </form> */}

              {/* <!-- Button --> */}
              {/* <button className="button full-width button-sliding-icon ripple-effect margin-top-10" onClick={this.handleRegister} type='submit'>Register</button> */}
              <div style={{ width: "950px" }} className="social-login-buttons">
                <LinkedIn
                  clientId={LinkedinSinin.clientId}
                  onFailure={this.handleLinkedinFailure}
                  onSuccess={this.handleLinkedinSuccess}
                  redirectUri={baseFrontenUrl + "/linkedin"}
                  scope='r_liteprofile r_emailaddress w_member_social'
                  renderElement={({ onClick, disabled }) => (
                    <button className="facebook-login ripple-effect" onClick={onClick} disabled={disabled}><i className="fa fa-linkedin"></i> Register via Linkedin</button>
                  )}
                /></div>
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
                    <button className="facebook-login ripple-effect" onClick={onClick} disabled={disabled}><i className="fa fa-linkedin"></i> Register via Linkedin</button>
                  )}
                />
                <GoogleLogin

                  clientId={googleSinin.clientId}
                  render={renderProps => (
                    <button className="google-login ripple-effect" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="icon-brand-google-plus-g"></i> Register via Google</button>
                  )}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogleErr}
                  cookiePolicy={'single_host_origin'}
                />
              </div> */}
              <br /><div></div>
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


