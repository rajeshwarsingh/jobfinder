import ls from 'local-storage'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { getServiceProposal, createServiceProposal } from '../../../Actions'
import Paypal from '../../../Components/payment/PaymentPaypal'
import config from '../../../config'
const { displayNameSettings } = config

export class ServiceProposalStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            reqAmount: '0',
            reqDays: '0',
            PendingAmount: '0',
            currentProposalStatus: 'not-send',
            proposal: {},
            payBookedChecked: false,
            payFinalChecked: false,
            paymentType: 'booked'
        }
        this.onDaysChange = this.onDaysChange.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
        this.handleProposalRequest = this.handleProposalRequest.bind(this)
        this.payBookedChecked = this.payBookedChecked.bind(this)
        this.payFinalChecked = this.payFinalChecked.bind(this)
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

    payBookedChecked(e) {
        console.log("payBookedChecked:", e.target.checked)
        this.setState({ payBookedChecked: (this.state.payBookedChecked ? false : true), payFinalChecked: false, paymentType: 'booked' })
    }

    payFinalChecked(e) {
        console.log("payFinalChecked:", e.target.checked)
        this.setState({ payFinalChecked: (this.state.payFinalChecked ? false : true), payBookedChecked: false, paymentType: 'completed-paid' })
    }

    onDaysChange(e) {
        this.setState({ reqDays: e.target.value })
    }
    onAmountChange(e) {
        this.setState({ reqAmount: e.target.value })
    }

    handleProposalRequest() {
        if (!this.state.reqAmount || parseInt(this.state.reqAmount) == 0) {
            alert('please add proposal amount!')
            return this.notifyErr('please add proposal amount!')

        }

        if (!this.state.reqDays || parseInt(this.state.reqDays) === 0) {
            return this.notifyErr('please add proposal Days!')
        }

        let body = {
            "serviceId": this.props.serviceData.serviceId,
            "userId": ls.get('userId'),
            "proposalTime": new Date(),
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
            this.notifyErr('proposal sent!')
            setTimeout(() => {
                return window.location.reload(false);
            }, 2000)


        })
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
                "proposalTime": true,
                "paymentType": true,
                "createrUserRequest": true,
                "userRequest": true,
                "finalProposalRequest": true,
                "updatedTime": true
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
        } = this.props.serviceData

        const { createrUserRequest = { "amount": "", "days": "" },
            userRequest = { "amount": "", "days": "" },
            finalProposalRequest = { "amount": "", "days": "", "bookingAmount": "", "PendingAmount": "" } } = this.state.proposal

        const currentProposalStatus = this.state.currentProposalStatus //

        let status =
            currentProposalStatus === 'not-send' ? 'Praposal not send' :
                currentProposalStatus === 'rejected-by-creater' ? 'Owner has Rejected' :
                    currentProposalStatus === 'sent' ? 'Request already sent, waiting for approval.' :
                        currentProposalStatus === 'revised' ? 'You revised proposal' :
                            currentProposalStatus === 'revised-by-creater' ? 'Owner revised proposal' :
                                currentProposalStatus === 'rejected' ? 'You reject' :
                                    currentProposalStatus === 'rejected-by-creater' ? 'Owner has Reject' :
                                        currentProposalStatus === 'attempted-pay' ? 'Payment attempted but not successful' :
                                            currentProposalStatus === 'accepted' ? 'You have Accepted' :
                                                currentProposalStatus === 'accepted-by-creater' ? 'congratulations!, Your request had been accepted, still need to pay.' :
                                                    currentProposalStatus === 'booked' ? 'Payment successful, Thank you!, Please do final payment after completion of joblot.' :
                                                        currentProposalStatus === 'completed' ? `${displayNameSettings.service} Completed.` :
                                                            currentProposalStatus === 'completed-paid' ? 'Payment successful, Thank you!' :
                                                                'Unknown Status'



        //Create a final booking and order object
        let finalProposalObj = {}

        if (this.state.payBookedChecked || this.state.payFinalChecked) {

            finalProposalObj = {
                amount: finalProposalRequest.amount, // final Amount of service
                bookingAmount: finalProposalRequest.bookingAmount,
                PendingAmount: finalProposalRequest.PendingAmount,
                days: finalProposalRequest.days,
                currency,
                paymentType: this.state.paymentType, //booked or completed-paid
                serviceProposalId: this.state.proposal.serviceProposalId,
                type: 'service'
            }
        }

        Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        let currentDate = new Date();

        const userRequestDateTime = currentDate.addDays(userRequest.days).toDateString()
        const createrUserRequestDateTime = currentDate.addDays(createrUserRequest.days).toDateString()
        const finalProposalRequestDateTime = currentDate.addDays(finalProposalRequest.days).toDateString()

        return (
            <div className="col-xl-6 col-lg-6 content-right-offset">
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
                <div className="sidebar-widget">
                    <div className="bidding-widget">
                        <div className="bidding-headline"><h3>Service Proposed Offer</h3></div>
                        <div className="bidding-inner">
                            <div className="bidding-fields">
                                <div className="notification success closeable"><span><strong>{status}</strong></span></div>
                            </div>
                            {/* <!-- Headline --> */}
                            {((currentProposalStatus === 'accepted-by-creater') || (currentProposalStatus === 'accepted') || (currentProposalStatus === 'revised-by-creater') || (currentProposalStatus === 'attempted-pay') || (currentProposalStatus === 'booked') || (currentProposalStatus === 'completed')) &&
                                <div><div className="bidding-fields">
                                    <span> <strong>Your Request : </strong>{`${userRequest.amount} ${currency} , ${userRequest.days} Days/ ${userRequestDateTime}`}</span>
                                </div>
                                    <div className="bidding-fields">
                                        <span> <strong>Accepted Proposal : </strong>{`${createrUserRequest.amount} ${currency} , ${createrUserRequest.days} Days/ ${createrUserRequestDateTime}`}</span>
                                    </div>
                                    <div className="bidding-fields">
                                        <span> <strong>Final Proposal : </strong>{`${finalProposalRequest.amount} ${currency} , ${finalProposalRequest.days} Days/ ${finalProposalRequestDateTime}`}</span>
                                    </div>

                                    {/* <!-- Headline --> */}
                                    <span className="bidding-detail margin-top-30">Booking Amount to Pay <strong>{`${finalProposalRequest.bookingAmount} ${currency}`}</strong></span>
                                    <span className="bidding-detail margin-top-30">Final Amount to Pay <strong>{`${finalProposalRequest.amount} ${currency}`}</strong></span>

                                    {/* <!-- Button --> */}
                                    <div className="bidding-detail margin-top-30">
                                        {!(currentProposalStatus === 'booked' || currentProposalStatus === 'completed' || currentProposalStatus === 'completed-paid') && <div className="checkbox">
                                            <input type="checkbox" id="paybookedid" onClick={this.payBookedChecked} checked={this.state.payBookedChecked} />
                                            <label for="paybookedid"><span className="checkbox-icon"></span> Click to Accept request and Book, 10% of total amount</label>
                                        </div>}
                                        {!(currentProposalStatus === 'completed-paid') && <div className="checkbox">
                                            <input type="checkbox" id="payfinalId" onClick={this.payFinalChecked} checked={this.state.payFinalChecked} />
                                            <label for="payfinalId"><span className="checkbox-icon"></span> Click Full and Final Payment</label>
                                        </div>}
                                        {(this.state.payBookedChecked || this.state.payFinalChecked) && <div style={{ display: 'inline-block' }}><Paypal finalProposalObj={finalProposalObj} type='service' {...this.props} /></div>}

                                    </div></div>}

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}