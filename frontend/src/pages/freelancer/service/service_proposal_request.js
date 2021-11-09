import ls from 'local-storage'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { getServiceProposal, createNotification, patchServiceProposal, createServiceProposal } from '../../../Actions'
import config from '../../../config'
const { displayNameSettings } = config

export class ServiceProposalRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            reqAmount: '',
            reqDays: '',
            finalAmount: '',
            currentProposalStatus: 'not-send',
            proposal: {}
        }
        this.onDaysChange = this.onDaysChange.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
        this.handleProposalRequest = this.handleProposalRequest.bind(this)
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

    onDaysChange(e) {
        this.setState({ reqDays: e.target.value })
    }
    onAmountChange(e) {
        this.setState({ reqAmount: e.target.value })
    }

    notifyErr = (msg) =>
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    notifySucc = (msg) =>
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    handleProposalRequest() {
        if (!this.state.reqAmount || parseInt(this.state.reqAmount) == 0) {
            return this.notifyErr('please add proposal amount!')
        }

        if (!this.state.reqDays || parseInt(this.state.reqDays) === 0) {
            return this.notifyErr('please add proposal Days!')
        }

        if (this.state.currentProposalStatus == 'not-send') {
            let body = {
                "serviceId": this.props.serviceData.serviceId,
                "userId": ls.get('userId'),
                "proposalTime": new Date(),
                "paymentType": "",
                "paymentAmount": "",
                "currentProposalStatus": "sent",
                "createrUserId": this.props.serviceData.userId,
                "userRequest": {
                    "amount": this.state.reqAmount,
                    "days": this.state.reqDays
                },
                "createrUserRequest": {},
                "finalProposalRequest": {}
            }

            createServiceProposal(body, (err, res) => {
                if (err || res.error) {
                    alert(err || res.error)
                    return
                }
                this.notifySucc("proposal sent!");
                setTimeout(() => {
                    const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
                    let readedUsers = []
                    readedUsers.push(ls.get('userId'))
                    let notifiyBody = {
                        type: 'service',
                        subtype: 'proposal-sent',
                        userId: ls.get('userId'),
                        notificationTypeId: this.props.serviceData.serviceId,
                        message: ` ${profile.firstName} ${profile.lastName} has send service Proposal`,
                        status: "unread",
                        notifyId: this.props.serviceData.userId,
                        createrUserId: this.props.serviceData.userId,
                        readedUsers: readedUsers
                    }
                    createNotification(notifiyBody, () => {
                        window.location.reload(false);
                    })
                }, 3000)

            })
        } else {
            let body = {
                userRequest: {
                    "amount": this.state.reqAmount,
                    "days": this.state.reqDays
                },
                finalProposalRequest: {
                    "amount": this.state.reqAmount,
                    "days": this.state.reqDays
                },

                currentProposalStatus: 'revised'
            }

            patchServiceProposal(this.state.proposal.serviceProposalId, body, (upErr, upRes) => {

                if (upErr || !upRes) {
                    return this.notifyErr(`Something went wrong!`)
                }

                this.notifySucc('proposal updated!')

                const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
                let readedUsers = []
                readedUsers.push(ls.get('userId'))
                let notifiyBody = {
                    type: 'service',
                    subtype: 'proposal-sent',
                    userId: ls.get('userId'),
                    notificationTypeId: this.props.serviceData.serviceId,
                    message: ` ${profile.firstName} ${profile.lastName} has updated joblem proposal`,
                    status: "unread",
                    notifyId: this.props.serviceData.userId,
                    createrUserId: this.props.serviceData.userId,
                    readedUsers: readedUsers
                }
                createNotification(notifiyBody, () => {

                })

                setTimeout(() => { return window.location.reload(false) }, 2000)
            })
        }


    }

    getProposaldata() {
        if (!ls.get('userId') || !this.props.serviceData.serviceId || !this.props.serviceData.userId) {
            this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
            return
        }

        let filter = {
            "offset": 0,
            "limit": 100,
            "skip": 0,
            "where": {
                "userId": ls.get('userId'),
                "serviceId": this.props.serviceData.serviceId,
                "createrUserId": this.props.serviceData.userId
            },
            "fields": {
                "serviceProposalId": true,
                "serviceId": true,
                "userId": true,
                "createrUserId": true,
                "currentProposalStatus": true,
                "proposalTime": false,
                "paymentType": false,
                "createrUserRequest": false,
                "userRequest": false,
                "finalProposalRequest": false,
                "updatedTime": false
            }
        }

        getServiceProposal(filter, (err, res) => {
            console.log('get proposal details:', err, res)
            if (err) {
                alert('error in fetching proposal details!', err)
                return
            }

            if (res && res.length && res[0].serviceProposalId) {
                this.setState({ currentProposalStatus: (res[0].currentProposalStatus ? res[0].currentProposalStatus : 'not-send'), proposal: res[0] })
            } else {
                this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
            }

        })
    }

    componentDidMount() {
        // CALL METHOD AFTER 1 SEC BECUSE REACT TAKS TIME TO LOAD THE PARENTS PROPS DATA, WHERES AS KEY WILL BE THERE      
        setTimeout(() => {
            this.getProposaldata()
        }, 1000);
    }

    render() {
        let {
            currency = '',
            paymentType = '',
        } = this.props.serviceData


        const currentProposalStatus = this.state.currentProposalStatus
        let status =
            currentProposalStatus === 'not-send' ? 'Praposal not send' :
                currentProposalStatus === 'rejected-by-creater' ? 'Owner has Rejected' :
                    currentProposalStatus === 'sent' ? 'Request already sent, waiting for approval.' :
                        currentProposalStatus === 'revised' ? 'You revised proposal' :
                            currentProposalStatus === 'revised-by-creater' ? 'Owner revised proposal' :
                                currentProposalStatus === 'rejected' ? 'You reject' :
                                    currentProposalStatus === 'rejected-by-creater' ? 'Owner has Reject' :
                                        currentProposalStatus === 'attempted-pay' ? 'Payment  attempted but not successful' :
                                            currentProposalStatus === 'accepted' ? 'You have Accepted' :
                                                currentProposalStatus === 'accepted-by-creater' ? 'congratulations!, Your request had been accepted, still need to pay.' :
                                                    currentProposalStatus === 'booked' ? 'Payment successful, Thank you!' :
                                                        currentProposalStatus === 'completed' ? `${displayNameSettings.service} Completed.` :
                                                            currentProposalStatus === 'completed-paid' ? 'Payment successful, Thank you!' :
                                                                'Unknown Status'

        Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        let currentDate = new Date();

        const ReqDateTime = this.state.reqDays ? currentDate.addDays(this.state.reqDays).toDateString() : ''


        {/* User can apply 1 time only and with status is 'not-send' */ }

        if (this.state.currentProposalStatus === 'not-send' || this.state.currentProposalStatus === 'revised' || this.state.currentProposalStatus === 'revised-by-creater') {
            return (
                <div className="col-xl-6 col-lg-6 content-right-offset">

                    <div className="sidebar-widget">
                        <div className="bidding-widget">
                            <div className="bidding-headline"><h3>Bid on this Service!</h3></div>
                            <div className="bidding-inner">

                                {/* <!-- Headline --> */}
                                <span >Set your <strong>minimal rate</strong></span><br />

                                {/* <!-- Price Slider --> */}
                                <div className="input-with-icon">
                                    <input value={this.state.reqAmount} onChange={this.onAmountChange} className="with-border" type="text" />
                                    <i className="currency">{currency}</i>
                                </div>
                                <span>{`${(paymentType === 'BY-The-Hour') ? 'Hourly' : 'Fixed Price'}`}</span>
                                {/* <!-- Headline --> */}
                                <span className="bidding-detail margin-top-30">Set your <strong>delivery Days</strong></span>

                                {/* <!-- Fields --> */}
                                <div className="bidding-fields">
                                    <div className="bidding-field">
                                        {/* <!-- Quantity Buttons --> */}
                                        <div className="qtyButtons">
                                            {/* <div className="qtyDec"></div> */}
                                            <input type="text" value={this.state.reqDays} onChange={this.onDaysChange} />
                                            <label>{ReqDateTime}</label>
                                        </div>
                                    </div>

                                </div>

                                {/* <!-- Button --> */}
                                <button onClick={this.handleProposalRequest} id="snackbar-place-bid" className="button ripple-effect move-on-hover full-width margin-top-30"><span>Place a Request</span></button>

                            </div>
                        </div>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div className="col-xl-6 col-lg-6 content-right-offset">
                    <div className="sidebar-widget">
                        <div className="bidding-widget">
                            <div className="bidding-headline"><h3>Bid on this Service!</h3></div>
                            <div className="bidding-inner">
                                <div className="single-page-section">
                                    <div className="notification success closeable"><span><strong>{status}</strong></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}