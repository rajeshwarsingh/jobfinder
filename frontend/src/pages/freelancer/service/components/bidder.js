import React, { Fragment } from 'react'
import { getServiceById,getServiceProposal,createServiceProposal,updateServiceProposal, getUserById, changeServiceProposalStatus } from '../../../../Actions'
import ls from 'local-storage'
export class Bidder extends React.Component {
    constructor() {
        super()
        this.state = {
            proposalDetails: {},
            userDetails: {},
            payTypesSelected:'hours',
            amount:'5',
            daysOrHours:'10',
            totalPrice:'5'*'10',
        }
        this.handleOfferAccept = this.handleOfferAccept.bind(this)
        this.handleOfferReject = this.handleOfferReject.bind(this)

        this.onPaytypeChange= this.onPaytypeChange.bind(this)
        this.onAmountChange= this.onAmountChange.bind(this)
        this.onDaysorHourChange= this.onDaysorHourChange.bind(this)

        this.handleBid = this.handleBid.bind(this)
    }

    handleBid() {
        console.log('check***',this.state.totalPrice,this.state.daysOrHours,this.state.payTypesSelected)
        // return
        let newData = this.props.Bidder
                newData.userId = ls.get('userId')
                newData.createrUserRequest = {
                    "amount" : this.state.totalPrice,
                    "days" : this.state.daysOrHours,
                    "payTypesSelected":this.state.payTypesSelected,
                    "message" : ""
                }

                updateServiceProposal(newData.serviceProposalId, newData, (upErr,upRes)=>{
                    if(upErr || upRes.error){
                        alert(upErr || upRes)
                        return
                    }
                    alert('proposal updated!',upRes)
                })

                return

        //check service proposal already exist or not
        const filter={
            "offset": 0,
            "limit": 100,
            "skip": 0,
            "where": {
                "serviceId": this.state.service.serviceId
            },
            "fields": {
              "serviceProposalId": true,
              "serviceId": true,
              "createrUserId": true,
              "proposalTime": true,
              "paymentType": true,
              "paymentAmount": true,
              "currentProposalStatus": true,
              "clientGrade": true,
              "clientComment": true,
              "freelancerGrade": true,
              "freelancerComment": true,
              "userId": true,
              "createrUserRequest": true,
              "userRequest": true,
              "finalProposalRequest": true,
              "updatedTime": true
            }
          }
        getServiceProposal(filter,(err, data)=>{
            console.log(err,data)
            if(err || data.error){
                alert(err || data)
                return
            }
            if(data.length){
                //call service proposal update
                
                let newData = data[0]
                newData.proposalTime=new Date()
                newData.userId = ls.get('userId')
                newData.userRequest = {
                    "amount" : this.state.totalPrice,
                    "days" : this.state.daysOrHours,
                    "payTypesSelected":this.state.payTypesSelected,
                    "message" : ""
                }
                updateServiceProposal(newData.serviceProposalId, newData, (upErr,upRes)=>{
                    if(upErr || upRes.error){
                        alert(upErr || upRes)
                        return
                    }
                    alert('proposal updated!',upRes)
                })
            }else{
                //call service proposal create
                
                const body = {
                    "serviceId": this.state.service.serviceId,
                    "createrUserId": this.state.service.userId,
                    "proposalTime": new Date(),
                    "paymentType": this.state.service.paymentType,
                    "paymentAmount": this.state.service.priceRange,
                    "currentProposalStatus": 'proposal-sent',
                    "clientGrade": '',
                    "clientComment": '',
                    "freelancerGrade": '',
                    "freelancerComment": '',
                    "userId": ls.get('userId'),
                    "createrUserRequest": {},
                    "userRequest": {
                        "amount" : this.state.totalPrice,
                        "days" : this.state.daysOrHours,
                        "payTypesSelected":this.state.payTypesSelected,
                        "message" : ""
                    },
                    "finalProposalRequest": {}
                  }
                createServiceProposal(body, (crErr, crRes)=>{
                    if(crErr  || crRes.error){
                        alert('service proposal ceate:',crErr||crRes)
                        return
                    }
                    alert('request Send!')
                    return

                })
            }

        })

    }

    onPaytypeChange(e){
        this.setState({payTypesSelected:e.target.value})
    }

    onAmountChange(e){
        this.setState({amount:e.target.value, totalPrice:(e.target.value * this.state.daysOrHours)})
    }

    onDaysorHourChange(e){
        this.setState({daysOrHours:e.target.value, totalPrice:(e.target.value * this.state.amount)})
    }


    handleOfferAccept() {
        let body = {
            currentProposalStatus: 'accepted',
            finalProposalRequest:this.props.Bidder.userRequest
        }
        changeServiceProposalStatus(this.state.proposalDetails.serviceProposalId, body, (err, res) => {
            if (err || res.error) {
                alert('error in proposal handle')
                return
            }
            console.log(res.serviceProposalId)
            alert('successfully accepted!')

            this.props.history.push('/freelancer/service_list')
        })
    }

    handleOfferReject() {
        let body = {
            currentProposalStatus: 'Rejected'
        }
        changeServiceProposalStatus(this.state.proposalDetails.serviceProposalId, body, (err, res) => {
            if (err || res.error) {
                alert('error in proposal handle')
                return
            }
            console.log(res.serviceProposalId)
            alert('successfully rejected!')

            this.props.history.push('/freelancer/service_list')
        })
    }

    componentDidMount() {
        let filter = {
            "offset": 0,
            "limit": 100,
            "skip": 0,
            "where": {
                serviceId: this.props.Bidder.serviceId,
                userId: this.props.Bidder.userId
            },
            "fields": {
                "serviceProposalId": true,
                "serviceId": true,
                "createrUserId": true,
                "proposalTime": true,
                "paymentType": true,
                "paymentAmount": true,
                "currentProposalStatus": true,
                "clientGrade": true,
                "clientComment": true,
                "freelancerGrade": true,
                "freelancerComment": true,
                "userId": true,
                "createrUserRequest": true,
                "userRequest": true,
                "finalProposalRequest": true,
                "updatedTime": true
            }
        }

        getServiceProposal(filter, (err, res) => {
            console.log('show all service Bidders:', err, res)

            if (err || res.error) {
                alert('unable to get bidder details')
                return
            }
            else {
                getUserById(res[0]['userId'],{}, (userErr, userDetails) => {
                    if (userErr || userDetails.error) {
                        alert('unable to get bidder details')
                        return
                    }

                    this.setState({
                        proposalDetails: res[0],
                        userDetails: userDetails
                    })
                })
            }

        })
    }

    getUserDetails

    render() {
        console.log('state:', this.state, this.props)
        const { title = '', createdDate = '', currency = 'INR' } = this.props.Bidder
        const { userRequest = '', currentProposalStatus = '' } = this.state.proposalDetails
        const { username = '', email = '', firstName = '', lastName = '' } = this.state.userDetails
        const { amount = '', days = '', message = '', payTypesSelected = '' } = userRequest

        const payTypes = [{
            label :"Hourly",
            value:'hourly'
        },{
            label:'Days',
            value:'days'
        }].map((item, i) => {
            return <option value={item.value} key={i} selected={item.value === this.state.jobFunTypeSelected}>{item.label}</option>
        })
        
        return (
            <Fragment>
                <li>
                    {/* <!-- Overview --> */}
                    <div className="freelancer-overview manage-candidates">
                        <div className="freelancer-overview-inner">

                            {/* <!-- Avatar --> */}
                            <div className="freelancer-avatar">
                                <div className="verified-badge"></div>
                                <a href="#"><img src={require('../../../../assets/images/user-avatar-big-02.jpg').default} alt="" /></a>
                            </div>

                            {/* <!-- Name --> */}
                            <div className="freelancer-name">
                                <h4><a href="#">{firstName} {lastName} <img className="flag" src={require('../../../../assets/images/flags/de.svg').default} alt="" title="Germany" data-tippy-placement="top" /></a></h4>

                                {/* <!-- Details --> */}
                                <span className="freelancer-detail-item"><a href="#"><i className="icon-feather-mail"></i> {email}</a></span>

                                {/* <!-- Rating --> */}
                                <div className="freelancer-rating">
                                    <div className="star-rating" data-rating="5.0"></div>
                                    Total Price: {this.state.totalPrice}
                                </div>

                                {/* <!-- Bid Details --> */}
                                <ul className="dashboard-task-info bid-info">
                                    <li><strong>{amount}{currency}</strong><span>Requested Price</span></li>
                                    <li><strong>{days} Days</strong><span>Delivery Time</span></li>
                                </ul>

                                {/* <!-- Buttons --> */}
                                <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        
                                        <input value={this.state.amount} onChange={this.onAmountChange}  type='text' placeholder='amount' style={{width:'100px'}}/>&nbsp;
                                        <input value={this.state.daysOrHours} onChange={this.onDaysorHourChange} type='text' placeholder='days/hours' style={{width:'100px'}}/>&nbsp;
                                        <div className="bidding-field">
                                                <select className="selectpicker default" onChange={this.onPaytypeChange}>
                                                    
                                                    {payTypes}
                                                </select>
                                            </div>
                                            {/* <button onClick={this.handleBid} id="snackbar-place-bid" className="button ripple-effect move-on-hover full-width margin-top-30"><span>Place a Bid</span></button> */}

                                        <button onClick={this.handleBid} className="button"><i className="icon-feather-mail"></i> Send proposal</button>
                                        </div>
                                    <button disabled={(currentProposalStatus === 'accepted' ? true : false)} onClick={this.handleOfferAccept} className="popup-with-zoom-anim button ripple-effect"> {currentProposalStatus === 'accepted' && <i className="icon-material-outline-check"></i>} {currentProposalStatus === 'accepted' ? 'Accepted' : ('Accept Offer')}</button>
                                    
                                    <button href="#" className="button gray ripple-effect ico" onClick={this.handleOfferReject} title="Remove Bid" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            </Fragment>
        )
    }
}