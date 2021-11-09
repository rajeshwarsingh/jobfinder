import ls from 'local-storage'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import qs from 'qs'
import { Accordion, Card } from 'react-bootstrap';
import { findNotificationByUserId, getNotificationById, patchNotification, patchUser, setUserDetails } from '../../Actions'

export class FreelancerDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            popupInfo: { msg: "", redirect: "", notifyData: {} },
            setShow: false,
            setEditShow: false,
            setWcShow:false,
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleWcShow = this.handleWcShow.bind(this)
        this.handleWcClose = this.handleWcClose.bind(this)
        this.handleOnboardingSubmit = this.handleOnboardingSubmit.bind(this)

        this.handleView = this.handleView.bind(this)
        this.markNotificationRead = this.markNotificationRead.bind(this)
    }

    markNotificationRead(item) {
        getNotificationById(item.notificationId, {}, (err, res) => {
            if (err) {
                return
            }

            let readedUsers = (res.readedUsers && Array.isArray(res.readedUsers) ? res.readedUsers : [])
            readedUsers.push(ls.get('userId'))

            patchNotification(item.notificationId, { readedUsers: readedUsers }, () => {

                if (res.type === 'post' && res.subtype === 'create') {
                    return this.props.history.push(`/freelancer/post/${res.notificationTypeId}`)
                }

                if (res.type === 'post' && res.subtype === 'proposal-sent') {
                    return this.props.history.push(`/hiremngr/post_manage_post`)
                }

                if (res.type === 'post' && res.subtype === 'rating-sent') {
                    return this.props.history.push(`/allrating/${res.data.ratingId}?ratingType=individual&ratingId=${res.data.ratingId}`)
                }

                if (res.type === 'service' && res.subtype === 'create') {
                    return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
                }

                if (res.type === 'service' && res.subtype === 'edit') {
                    return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
                }

                if (res.type === 'service' && (res.subtype === 'proposal-sent' || res.subtype === 'proposal-booked' || res.subtype === 'proposal-completed-paid')) {
                    return this.props.history.push(`/freelancer/service_manage_bidders/${item.notificationTypeId}`)
                }

                if (res.type === 'service' && (res.subtype === 'proposal-revised' || res.subtype === 'proposal-completed' || res.subtype === 'proposal-accepted' || res.subtype === 'proposal-rejected')) {
                    return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
                }

                if (res.type === 'service' && res.subtype === 'fav') {
                    return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
                }

                const redirectRoute = item.type === 'service' ? `/freelancer/service_manage_bidders/${item.notificationTypeId}`
                    : item.type === 'post' ? `/hiremngr/post_manage_bidders/${item.notificationTypeId}`
                        : '#'
                this.getNotificationData()
                this.props.history.push(redirectRoute)
            })
        })

    }

    handleView() {
        this.markNotificationRead(this.state.popupInfo.notifyData)
    }

    handleOnboardingSubmit() {
        this.handleClose()
    }


    handleClose = () => this.setState({ setShow: false })
    handleShow = () => {
        this.setState({ setShow: true });
    }

    handleWcClose = () => {
        
        this.setState({ setWcShow: false })
        patchUser(ls.get('userId'),{readWCPupup:true},()=>{
            setUserDetails(ls.get('userId'), ()=>{})
        })
    }

    handleWcShow = () => {
        this.setState({ setWcShow: true });
    }

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
    })

    getNotificationData() {
        const filter = {
            offset: 0,
            limit: 100,
            skip: 0,
            where: {
                status: 'unread'
            },
            fields: {
                notificationId: true,
                type: true,
                userId: true,
                notifyId: true,
                notificationTypeId: true,
                message: true,
                status: true,
                createdDate: true,
            }
        }

        findNotificationByUserId(ls.get('userId'), {}, (err, res) => {
            if (err) {
                alert('error in notification')
                return
            }

            if (Array.isArray(res)) {
                res.map(item => {
                    if (item.subtype === 'proposal-sent' || item.subtype === 'proposal-booked' || item.subtype === 'proposal-completed-paid') {
                        const redirectRoute = item.type === 'service' ? `/freelancer/service_manage_bidders/${item.notificationTypeId}`
                            : item.type === 'post' ? `/hiremngr/post_manage_bidders/${item.notificationTypeId}`
                                : '#';
                        this.setState({ popupInfo: { msg: item.message, redirect: redirectRoute, notifyData: item }, setShow: true })
                        return;
                    }
                })
            }
        })
    }

    componentDidMount() {
        let search = this.props.history.location.search
        if (search.length && search[0] === '?') {
            search = search.substr(1, search.length)
            search = qs.parse(search);
        }

        const { title = '', msg = '', login = false, skills = '' } = search

        //check for success login notification
        if (login) {
            setTimeout(() => this.notifySucc(msg), 0)
        }

        this.getNotificationData()

        const userProfile = JSON.parse(ls.get('userProfile'))
        if(!userProfile.readWCPupup)this.setState({setWcShow:true})
        
    }

    render() {

        const userProfile = JSON.parse(ls.get('userProfile'))
        const color = '#00B0F0'
        return (
            <Fragment>
                {/* <!-- Dashboard Content================================================== --> */}
                <div className="dashboard-content-container" data-simplebar>
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
                    <Modal show={this.state.setShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            {/* <div className="welcome-text"> */}
                            {/* <!-- Welcome Text --> */}

                        </Modal.Header>
                        <Modal.Body>
                            <div className="welcome-text">
                                <h3>congratulations</h3>
                                {/* <span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span> */}
                            </div>
                            <form method="post" id="change-review-form">
                                <div className="feedback-yes-no">
                                    <strong><div>{this.state.popupInfo.msg}</div></strong>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
								</Button>
                            <Button style={{ backgroundColor: color }} variant="primary" onClick={this.handleView}>
                                View
								</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.setWcShow} onHide={this.handleWcClose}>
                        <Modal.Header closeButton>
                            {/* <div className="welcome-text"> */}
                            {/* <!-- Welcome Text --> */}

                        </Modal.Header>
                        <Modal.Body>
                            <div className="welcome-text">
                                <h3>Howdy, {userProfile.firstName}!</h3>
                                {/* <span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span> */}
                            </div>
                            <form method="post" id="change-review-form">
                                <div className="feedback-yes-no">
                                    <strong><div>Welcome to Jobiously, Please complete your onboarding details</div></strong>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            {/* <Button variant="secondary" onClick={this.handleClose}>
                                Yes
								</Button> */}
                            <Button style={{ backgroundColor: color }} variant="primary" onClick={()=>this.props.history.push('/freelancer/profile_edit')}>
                                complete profile
								</Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="dashboard-content-inner" >

                        {/* <!-- Dashboard Headline --> */}
                        <div className="dashboard-headline">
                            <h3>Howdy, {userProfile.firstName}!</h3>
                            <span>We are glad to see you again!</span><br />

                            { !userProfile.readWCPupup  && <div className="col-xl-12">

                                <div className="notification notice">
                                    <p> <strong>{userProfile.firstName}</strong> Please <a href="/freelancer/profile_edit">Edit Your Profile</a></p>
                                </div>
                            </div>} 

                            <div className='row'>
                                <div class="col-xl-12 col-md-12">
                                    <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                                        frameborder='0'
                                        allow='autoplay; encrypted-media'
                                        allowfullscreen
                                        title='video'
                                    />
                                </div>
                                <div class="col-xl-12 col-md-12">

                                    <div class="section-headline border-top margin-top-45 padding-top-45 margin-bottom-30">
                                        <h4>Some Definitions</h4>
                                    </div>

                                    <div class="accordion js-accordion">
                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    <strong>Joblem</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>A short piece of work (few hours) that needs to be done (i.e. a job post).</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                                    <strong>Jobber</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="1">
                                                    <Card.Body>A skilled individual seeking a short piece of work (few hours) i.e. seeking a Joblem.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                                    <strong>Jobster</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="2">
                                                    <Card.Body>A company or individual seeking help for a short piece of work (few hours) i.e. seeking a Jobber.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                                    <strong>Joblot</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="3">
                                                    <Card.Body>A small (1hr to 1 week) fixed-price well defined service/solution e.g. logo design.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="4">
                                                    <strong>Jobboard</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="4">
                                                    <Card.Body>Place where joblems are posted.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="5">
                                                    <strong>Jobspace</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="5">
                                                    <Card.Body>Place where Joblots are posted.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* <!-- Footer --> */}
                        <div className="dashboard-footer-spacer"></div>
                        <div className="small-footer margin-top-15">
                            <div className="small-footer-copyrights">
                                © 2021 <strong>jobviously</strong>. All Rights Reserved.
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
