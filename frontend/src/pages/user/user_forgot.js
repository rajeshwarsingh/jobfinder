import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../Actions/index'
import { setCookies, getCookieByName } from '../../utility/index'
import config from '../../config'
import { ToastContainer, toast } from 'react-toastify';
var Spinner = require('react-spinkit');
const { baseFrontenUrl } = config

export class UserForgot extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      spinner:false,
      }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.handleForgot = this.handleForgot.bind(this)
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

  onEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleForgot() {
    
    //validate email and passward field
    if (!this.state.email) {
      this.notifyErr('Invalid emal!')
      return
    }
    this.setState({spinner:true})
    //create body
    const body = {
      email: this.state.email,
      password: "12345678"
    }

    //call Forgot api
    forgotPassword(body, (err, res) => {
      this.setState({spinner:false})
      console.log('Forgot result :', err, res)

      if (err || (res && res.error)) {
        console.log('Error in Forgot handle Api:',err || (res && res.error))
        this.notifyErr('Unable to Forgot, Please try again later.')
        return;
      }

      if (res && res.msg === 'success') {
        this.notifySucc('Password sent!, Please check your mail.')
        this.setState({email:""})
        return
      }
      
      return
    })
  }

  componentDidMount() {
  }

  render() {
    return (<Fragment>
      {/* <!-- Titlebar */}
      {/* ================================================== --> */}
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <h2>Forgot Password</h2>

              {/* <!-- Breadcrumbs --> */}
              <nav id="breadcrumbs" className="dark">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li>Forgot Password</li>
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


            <div className="Forgot-register-page">
              {/* <!-- Welcome Text --> */}

              <div className="welcome-text">
              {this.state.spinner && <div style={{alignContent:'center'}}><Spinner name="line-scale" color="blue"/></div>}
                <h3>Please Enter email</h3>
              </div>

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

              {!this.state.isForgot && (<div><div className="welcome-text">
              </div>

                {/* <!-- Form --> */}
                <form method="post" id="Forgot-form">
                  <div className="input-with-icon-left">
                    <i className="icon-material-baseline-mail-outline"></i>
                    <input type="text" value={this.state.email} onChange={this.onEmailChange} className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
                  </div>
                  <a href="/login" className="forgot-password">click to login</a>
                  </form>

                {/* <!-- Button --> */}
                <button className="button full-width button-sliding-icon ripple-effect margin-top-10" onClick={() => this.handleForgot('freelancer')}>Submit </button>
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