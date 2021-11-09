import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {resetPassword} from '../../Actions'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
{/* <Link to='/hiremngr/posts'>show posts</Link> or <Link to='/hiremngr/post/create'>create post</Link> or or <Link to='/user/account/view'>account Setting</Link> */ }

export class FreelancerSetting extends React.Component {
    constructor() {
        super();
        this.state = {
            setShow: false,
            password: '',
            rePassword: '',
        }

        this.handleClose = this.handleClose.bind(this)
		this.handleShow = this.handleShow.bind(this)
        this.handleDeleteUserAccount = this.handleDeleteUserAccount.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleClose = () => this.setState({ setShow: false })
    handleShow = () => this.setState({ setShow: true })
    
    notifyErr = (msg) => toast.error(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
    notifySucc = (msg) => toast.success(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

	handleDeleteUserAccount(){
		this.handleClose()
		console.log('handle Service clicked');
		
		// deleteUser(ls.get("userId"),(err, data)=>{
		// 	console.log(err, data)
		// 	// alert('User deleted!')
		// 	this.props.history.push('/')
		// })
    }
    
    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    onRepeatPasswordChange(e) {
        this.setState({ rePassword: e.target.value })
    }

    handlePasswordChange(){
        
        //validate email and passward field
        if (!this.state.rePassword || !this.state.password) {
            this.notifyErr("password and re-password can't be blank")
            return
        }
        
        if (this.state.rePassword !== this.state.password) {
            this.notifyErr('Password missmatched!')
            return
        }
        
        const profile = JSON.parse(ls.get('userProfile'))
         //create body
        const body = {
            email: profile.email,
            password: this.state.password
        }

        //call reset api
        resetPassword(body, (err, res) => {
            console.log('Forgot result :', err, res)
    
            if (err || (res && res.error)) {
            console.log('Error in Forgot handle Api:',err || (res && res.error))
            this.notifyErr('Unable to reset, Please try again later.')
            return;
            }
    
            if (res) {
            this.notifySucc('Password reset!')
            this.setState({email:""})
            setTimeout(()=>{
                this.props.history.push('/login')
            }, 2000)
            }
            
            
        })

    }

    render() {
        return (
            <Fragment>
                {/* <!-- Dashboard Content================================================== --> */}
                <div className="dashboard-content-container" data-simplebar>
                    <div className="dashboard-content-inner" >

                        {/* <!-- Dashboard Headline --> */}
                        <div className="dashboard-headline">
                            <h3>Settings</h3>

                            {/* <!-- Breadcrumbs --> */}
                            <nav id="breadcrumbs" className="dark">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Dashboard</a></li>
                                    <li>Settings</li>
                                </ul>
                            </nav>
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
                        {/* <!-- Row --> */}
                        <div className="row">


                            {/* <!-- Dashboard Box --> */}
                            <div className="col-xl-12">
                                <div id="test1" className="dashboard-box">

                                    {/* <!-- Headline --> */}
                                    <div className="headline">
                                        <h3><i className="icon-material-outline-lock"></i> Password & Security</h3>
                                    </div>

                                    <div className="content with-padding">
                                        <div className="row">
                                            
                                            <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>New Password</h5>
                                                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} className="with-border" />
                                                </div>
                                            </div>

                                            <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>Repeat New Password</h5>
                                                    <input type="password" value={this.state.rePassword} onChange={this.onRepeatPasswordChange} className="with-border" />
                                                </div>
                                            </div>

                                            {/* <div className="col-xl-4">
                                            <button onClick={this.handleShow} style={{backgroundColor:'#dc3139'}} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">delete Service</button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Button --> */}
                            <div className="col-xl-12">
                                <button href="#" onClick={this.handlePasswordChange} className="button ripple-effect big margin-top-30">Save Changes</button>
                            </div>

                            <div style={{marginTop:20}} className="col-xl-12">
                                <div class="notification notice closeable"><Link to='/blocks'>Click to show all blocks</Link></div>
                            </div>

                            <div className="col-xl-12">
                                <div id="test1" className="dashboard-box">

                                    {/* <!-- Headline --> */}
                                    <div className="headline">
                                        <h3><i className="icon-material-outline-lock"></i> Once account deleted it will not restored</h3>
                                    </div>

                                    <div className="content with-padding">
                                        <div className="row">
                                            <div className="col-xl-4">
                                            <button onClick={this.handleShow} style={{backgroundColor:'#dc3139'}} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">delete Account</button>
                                            </div>
                                            {/* confirmation modal */}
                                            <Modal show={this.state.setShow} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Please confirm</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Once you delete the Account, I will not restore.</Modal.Body>
                                                <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="danger" onClick={this.handleDeleteUserAccount}>
                                                    Delete Account
                                                </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            {/* end */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            

                        </div>
                        {/* <!-- Row / End --> */}

                        {/* <!-- Footer --> */}
                        <div className="dashboard-footer-spacer"></div>
                        <div className="small-footer margin-top-15">
                            <div className="small-footer-copyrights">
                                © 2020` <strong>Jugaad</strong>. All Rights Reserved.
				            </div>
                            <ul className="footer-social-links">
                                <li>
                                    <a href="#" title="Facebook" data-tippy-placement="top">
                                        <i className="icon-brand-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Twitter" data-tippy-placement="top">
                                        <i className="icon-brand-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Google Plus" data-tippy-placement="top">
                                        <i className="icon-brand-google-plus-g"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="LinkedIn" data-tippy-placement="top">
                                        <i className="icon-brand-linkedin-in"></i>
                                    </a>
                                </li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        {/* <!-- Footer / End --> */}

                    </div>
                </div>
                {/* <!-- Dashboard Content / End --> */}

            </Fragment >)
    }
}
