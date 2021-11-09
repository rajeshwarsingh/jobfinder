import React, { Fragment } from 'react'
import { createNotification, patchServiceProposal, getUserById, changeServiceProposalStatus } from '../../../../Actions'
import ls from 'local-storage'
import { ToastContainer, toast } from 'react-toastify';
import config from '../../../../config'
const { displayNameSettings } = config

export class Bid extends React.Component {
    constructor() {
        super()
        this.state = {
            userDetails: {},
            payTypesSelected: 'hours',
            amount: '',
            daysOrHours: '',
            totalPrice: '',
        }

        this.handleOfferAccept = this.handleOfferAccept.bind(this)
        this.handleCompleted = this.handleCompleted.bind(this)
        this.handleOfferReject = this.handleOfferReject.bind(this)

        this.onPaytypeChange = this.onPaytypeChange.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
        this.onDaysorHourChange = this.onDaysorHourChange.bind(this)

        this.handleBid = this.handleBid.bind(this)
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
    });

    handleBid() {
        let body = {
            createrUserRequest: {
                "amount": this.state.amount,
                "days": this.state.daysOrHours
            },
            finalProposalRequest: {
                "amount": this.state.amount,
                "days": this.state.daysOrHours,
                "bookingAmount": (this.state.amount * 10) / 100,
                "PendingAmount": this.state.amount
            },

            currentProposalStatus: 'revised-by-creater'
        }

        patchServiceProposal(this.props.Bid.serviceProposalId, body, (upErr, upRes) => {
            if (upErr || upRes.error) {
                console.log(upErr || upRes)
                return this.notifyErr('something went wrong!')
            }
            this.notifySucc('proposal updated!')
            
            let userProfile = ls.get('userProfile')
            userProfile = (userProfile.length) ? JSON.parse(userProfile) : {}
            let readedUsers = []
            readedUsers.push(ls.get('userId'))
            let notifiyBody = {
                userId: ls.get('userId'),
                type: 'service',
                subtype: "proposal-revised",
                data: {},
                notificationTypeId: this.props.Bid.serviceId,
                message: `${displayNameSettings.service}:${userProfile.firstName} ${userProfile.lastName} has revised ${this.props.service.title}  proposal`,
                status: "unread",
                createrUserId: ls.get('userId'),
                readedUsers: readedUsers
            }
            createNotification(notifiyBody, () => {
                this.props.history.push('/freelancer/service_list');
            })
        })
    }

    onPaytypeChange(e) {
        this.setState({ payTypesSelected: e.target.value })
    }

    onAmountChange(e) {
        this.setState({ amount: e.target.value, totalPrice: (e.target.value * this.state.daysOrHours) })
    }

    onDaysorHourChange(e) {
        this.setState({ daysOrHours: e.target.value, totalPrice: (e.target.value * this.state.amount) })
    }

    handleCompleted() {

        let body = {
            currentProposalStatus: 'completed'
        }

        patchServiceProposal(this.props.Bid.serviceProposalId, body, (upErr, upRes) => {
            if (upErr || upRes.error) {
                console.log(upErr || upRes)
                this.notifyErr('something went wrong!')
                return
            }
            this.notifySucc('successfully accepted!')

            let userProfile = ls.get('userProfile')
            userProfile = (userProfile.length) ? JSON.parse(userProfile) : {}
            let readedUsers = []
            readedUsers.push(ls.get('userId'))
            let notifiyBody = {
                userId: ls.get('userId'),
                type: 'service',
                subtype: "proposal-completed",
                data: {},
                notificationTypeId: this.props.Bid.serviceId,
                message: `${displayNameSettings.service}:${userProfile.firstName} ${userProfile.lastName} has completed ${this.props.service.title || ''}  proposal`,
                status: "unread",
                createrUserId: ls.get('userId'),
                readedUsers: readedUsers
            }
            createNotification(notifiyBody, () => {
                this.props.history.push('/freelancer/service_list');
            })
        })
    }

    handleOfferAccept() {

        let body = {
            finalProposalRequest: {
                "amount": this.props.Bid.userRequest.amount,
                "days": this.props.Bid.userRequest.days,
                "bookingAmount": (this.props.Bid.userRequest.amount * 10) / 100,
                "PendingAmount": this.props.Bid.userRequest.amount
            },
            createrUserRequest: this.props.Bid.userRequest,
            currentProposalStatus: 'accepted-by-creater'
        }

        patchServiceProposal(this.props.Bid.serviceProposalId, body, (upErr, upRes) => {
            if (upErr || upRes.error) {
                console.log(upErr || upRes)
                this.notifyErr('something went wrong!')
                return
            }
            this.notifySucc('successfully accepted!')

            let userProfile = ls.get('userProfile')
            userProfile = (userProfile.length) ? JSON.parse(userProfile) : {}
            let readedUsers = []
            readedUsers.push(ls.get('userId'))
            let notifiyBody = {
                userId: ls.get('userId'),
                type: 'service',
                subtype: "proposal-accepted",
                data: {},
                notificationTypeId: this.props.Bid.serviceId,
                message: ` ${userProfile.firstName} ${userProfile.lastName} has accepted ${displayNameSettings.service} Proposal`,
                status: "unread",
                createrUserId: ls.get('userId'),
                readedUsers: readedUsers
            }
            createNotification(notifiyBody, () => {
                setTimeout(() => { return this.props.history.push('/freelancer/service_list'); }, 2000)

            })

        })
    }

    handleOfferReject() {
        let body = {
            currentProposalStatus: 'rejected-by-creater'
        }

        changeServiceProposalStatus(this.props.Bid.serviceProposalId, body, (err, res) => {
            if (err || res.error) {
                alert('error in proposal handle')
                return
            }
            console.log(res.serviceProposalId)
            this.notifySucc('successfully rejected!')

            let userProfile = ls.get('userProfile')
            userProfile = (userProfile.length) ? JSON.parse(userProfile) : {}
            let readedUsers = []
            readedUsers.push(ls.get('userId'))
            let notifiyBody = {
                userId: ls.get('userId'),
                type: 'service',
                subtype: "proposal-rejected",
                data: {},
                notificationTypeId: this.props.Bid.serviceId,
                message: ` ${userProfile.firstName} ${userProfile.lastName} has rejected ${displayNameSettings.service} Proposal`,
                status: "unread",
                createrUserId: ls.get('userId'),
                readedUsers: readedUsers
            }
            createNotification(notifiyBody, () => {
                this.props.history.push('/freelancer/service_list');
                return
            })
        })
    }

    getUserdata() {
        let filter = {
            "offset": 0,
            "limit": 100,
            "skip": 0,
            "fields": {
                "userId": true,
                "email": true,
                "firstName": true,
                "lastName": true,
                "about": true,
                "skills": true,
                "nationalitySelected": true,
                "pic": true
            }
        }

        getUserById(this.props.Bid.userId, filter, (userErr, userDetails) => {
            console.log('user :', userErr, userDetails)
            if (userErr || userDetails.error) {
                alert('unable to get bidder details')
                return
            }

            this.setState({
                userDetails: userDetails
            })
        })
    }

    componentDidMount() {
        // CALL METHOD AFTER 1 SEC BECUSE REACT TAKS TIME TO LOAD THE PARENTS PROPS DATA, WHERES AS KEY WILL BE THERE        
        setTimeout(() => {
            this.getUserdata()
        }, 1000);
    }

    render() {
        const { userRequest = {}, currentProposalStatus } = this.props.Bid//proposal details

        const { email = '' } = this.state.userDetails

        const { title = '', min = '', max = '', currency = '', expectedDuration = '', paymentType = '' } = this.props.service

        const { amount = '', days = '' } = userRequest

        Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        let currentDate = new Date();

        const deliveredate = currentDate.addDays(days).toDateString()
        const selectedDate = this.state.daysOrHours ? (new Date()).addDays(this.state.daysOrHours).toDateString() : ""

        let status =
            currentProposalStatus === 'not-send' ? 'Proposal not send' :
                currentProposalStatus === 'rejected-by-creater' ? 'You rejected' :
                    currentProposalStatus === 'sent' ? 'You recived proposal from user' :
                        currentProposalStatus === 'revised' ? 'User has revised the request' :
                            currentProposalStatus === 'revised-by-creater' ? 'You revised proposal' :
                                currentProposalStatus === 'rejected' ? 'User reject' :
                                    currentProposalStatus === 'rejected-by-creater' ? 'You reject' :
                                        currentProposalStatus === 'attempted-pay' ? 'Payment attempted but not successful' :
                                            currentProposalStatus === 'accepted' ? 'congratulations!, Praposal had been accepted, still need to pay.' :
                                                currentProposalStatus === 'accepted-by-creater' ? 'You Accepted' :
                                                    currentProposalStatus === 'booked' ? `Payment successful, User Booked the ${displayNameSettings.service}!` :
                                                        currentProposalStatus === 'completed' ? `${displayNameSettings.service} Completed.` :
                                                            currentProposalStatus === 'completed-paid' ? `congratulations!,  ${displayNameSettings.service} delived and Payment successful ` :
                                                                'Unknown Status'

        return (
            <Fragment>
                <li>
                    {/* <!-- Overview --> */}
                    <div className="freelancer-overview manage-candidates">
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
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

                        <div className="freelancer-overview-inner">

                            {/* <!-- Avatar --> */}
                            <div className="freelancer-avatar">
                                <div className="verified-badge"></div>
                                <a href="#"><img src={require('../../../../assets/images/user-avatar-big-02.jpg').default} alt="" /></a>
                            </div>

                            {/* <!-- Name --> */}
                            <div className="freelancer-name">
                                <h4><a href="#">{title}
                                </a></h4>
                                <div class='success'>{status}</div>
                                {/* <!-- Details --> */}
                                <span className="freelancer-detail-item"><a href="#"><i className="icon-feather-mail"></i> {email}</a></span>
                                <span>Price Range:{`${min}-${max}/${currency}`} in {expectedDuration} days</span>

                                {/* <!-- Rating --> */}
                                <div className="freelancer-rating">

                                </div>

                                {/* <!-- Bid Details --> */}
                                <ul className="dashboard-task-info bid-info">
                                    <li><strong>{amount}{currency}</strong><span>Requested Price</span></li>
                                    <li><strong>{days} Days</strong><span>{deliveredate}Delivery Time</span></li>

                                </ul>

                                {/* <!-- Buttons --> */}
                                {!(currentProposalStatus === 'rejected-by-creater' || currentProposalStatus === 'rejected' || currentProposalStatus === 'accepted-by-creater' || currentProposalStatus === 'accepted' || currentProposalStatus === 'attempted-pay' || currentProposalStatus === 'booked' || currentProposalStatus === 'completed' || currentProposalStatus === 'completed-paid') &&
                                    <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                                        {(currentProposalStatus !== 'revised' || currentProposalStatus !== 'revised-by-creater') &&
                                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                                <input value={this.state.amount} onChange={this.onAmountChange} type='text' placeholder='amount' style={{ width: '100px' }} />&nbsp;
                                                <input value={this.state.daysOrHours} onChange={this.onDaysorHourChange} type='text' placeholder='days/hours' style={{ width: '100px' }} />
                                                <label>{selectedDate}</label>&nbsp;
                                        <div className="bidding-field">
                                                    <select className="selectpicker default" onChange={this.onPaytypeChange}>

                                                        {paymentType}
                                                    </select>
                                                </div>&nbsp;

                                                <button onClick={this.handleBid} className="button"><i className="icon-feather-mail"></i> Send revised proposal</button>&nbsp;

                                        </div>}
                                        <button onClick={this.handleOfferAccept} className="popup-with-zoom-anim button ripple-effect">accept</button>&nbsp;

                                    <button onClick={this.handleOfferReject} className="button gray ripple-effect ico" onClick={this.handleOfferReject} title="Remove Bid" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></button>
                                    </div>}
                                <div>{currentProposalStatus === 'booked' && <button onClick={this.handleCompleted} className="popup-with-zoom-anim button ripple-effect">Inform for Completed</button>}</div>

                            </div>
                        </div>
                    </div>
                </li>

            </Fragment>
        )
    }
}