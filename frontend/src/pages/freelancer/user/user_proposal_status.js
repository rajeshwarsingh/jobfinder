import ls from 'local-storage'
import React, { Fragment } from 'react'
import { getUserProposal, createUserProposal } from '../../../Actions'
import Paypal from '../../../Components/payment/PaymentPaypal'
export class UserProposalStatus extends React.Component {
  constructor () {
    super()
    this.state = {
      reqAmount: '0',
      reqDays: '0',
      finalAmount: '0',
      currentProposalStatus: 'not-send',
      proposal: {},
      payChecked: false
    }
    this.onDaysChange = this.onDaysChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.handleProposalRequest = this.handleProposalRequest.bind(this)
    this.payChecked = this.payChecked.bind(this)

    // this.bidAmountChange = this.bidAmountChange.bind(this)
    // this.bidDaysChange = this.bidDaysChange.bind(this)
    // this.handleBidRequest = this.handleBidRequest.bind(this)
    // this.bidMessageChange = this.bidMessageChange.bind(this)
    // this.handleBidQualifyRequest = this.handleBidQualifyRequest.bind(this)
    // this.getProposaldata = this.getProposaldata.bind(this)
  }

  payChecked (e) {
    console.log(e.target.checked)
    this.setState({ payChecked: (!this.state.payChecked) })
  }

  onDaysChange (e) {
    this.setState({ reqDays: e.target.value })
  }

  onAmountChange (e) {
    this.setState({ reqAmount: e.target.value })
  }

  handleProposalRequest () {
    // validation
    if (!this.state.reqAmount || parseInt(this.state.reqAmount) == 0) {
      alert('please add proposal amount!')
      return
    }

    if (!this.state.reqDays || parseInt(this.state.reqDays) === 0) {
      alert('please add proposal Days!')
      return
    }

    const body = {
      frUserId: this.props.userData.userId,
      userId: ls.get('userId'),
      proposalTime: new Date(),
      paymentType: '',
      paymentAmount: '',
      currentProposalStatus: 'sent',
      createrUserId: this.props.userData.userId,
      userRequest: {
        amount: this.state.reqAmount,
        days: this.state.reqDays
      },
      createrUserRequest: {},
      finalProposalRequest: {}
    }

    createUserProposal(body, (err, res) => {
      if (err || res.error) {
        alert(err || res.error)
        return
      }
      alert('proposal sent!')
      window.location.reload(false)
    })
  }

  // bidAmountChange(e) {
  //     this.setState({ bidAmount: e.target.value })
  // }

  // bidDaysChange(e) {
  //     this.setState({ bidDays: e.target.value })
  // }

  // bidMessageChange(e) {
  //     this.setState({ bidMessage: e.target.value })
  // }

  // handleBidQualifyRequest() {
  //     //validation
  //     if (!this.state.bidAmount) {
  //         alert('please add proposal amount!')
  //         return
  //     }

  //     if (!this.state.bidDays) {
  //         alert('please add proposal Days!')
  //         return
  //     }

  //     const amount = (this.props.userData === 'BY-The-Hour' ? (this.state.bidAmount * this.state.bidDays) : this.state.bidAmount)
  //     this.props.history.push(`/quiz/${this.props.userData.userId}?amount=${amount}&days=${this.state.bidDays}&message=${this.state.bidMessage}`)
  //     return
  // }

  getProposaldata () {
    if (!ls.get('userId') || !this.props.userData.userId || !this.props.userData.userId) {
      this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
      return
    }

    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        userId: ls.get('userId'),
        frUserId: this.props.userData.userId,
        createrUserId: this.props.userData.userId
      },
      fields: {
        userProposalId: true,
        userId: true,
        frUserId: true,
        createrUserId: true,
        currentProposalStatus: true,
        proposalTime: true,
        paymentType: true,
        createrUserRequest: true,
        userRequest: true,
        finalProposalRequest: true,
        updatedTime: true
      }
    }

    getUserProposal(filter, (err, res) => {
      console.log('get proposal details:', err, res)
      if (err) {
        alert('error in fetching proposal details!', err)
        return
      }

      if (res && res.length && res[0].userProposalId) {
        this.setState({ currentProposalStatus: (res[0].currentProposalStatus ? res[0].currentProposalStatus : 'not-send'), proposal: res[0] })
      } else {
        this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getProposaldata()
    }, 1000)
  }

  render () {
    console.log('props request status:', this.props)
    console.log('state:', this.state)
    // console.log('state:', this.state)
    const {
      userId = '',
      frUserId = '',
      description,
      priceRange = '',
      files,
      currency = '',
      subSkill,
      location = {
        lat: '',
        lng: ''
      },
      paymentType = ''
    } = this.props.userData

    const {
      createrUserRequest = { amount: '', days: '' },
      userRequest = { amount: '', days: '' },
      finalProposalRequest = { amount: '', days: '' }
    } = this.state.proposal

    const currentProposalStatus = this.state.currentProposalStatus
    const status =
        currentProposalStatus === 'rejected-by-creater' ? 'You have Rejected'
          : currentProposalStatus === 'not-send' ? 'Praposal not send'
            : currentProposalStatus === 'rejected' ? 'User Reject'
              : currentProposalStatus === 'accepted-by-creater' ? 'You have Accepted'
                : currentProposalStatus === 'attempted-pay' ? 'Payment  attempted but not successful'
                  : currentProposalStatus === 'sent' ? 'User send Request'
                    : currentProposalStatus === 'revised' ? 'You had reviced the Propoal'
                      : currentProposalStatus === 'accepted' ? 'congratulations!, Your request had been accepted, still need to pay.'
                        : 'Unknown Status'
    console.log('*******************', status, currentProposalStatus)
    // on pyachecked create final proposal
    let finalProposalObj = {}
    if (this.state.payChecked) {
      const { amount = '', days = '', message = '' } = userRequest
      finalProposalObj = {
        amount,
        days,
        currency,
        proposal: this.state.proposal.userProposalId,
        type: 'user'
      }
    }

    // return request component-----------

    { /* User can apply 1 time only and with status is 'not-send' */ }

    // if (currentProposalStatus === 'not-send' || currentProposalStatus === 'revised') {
    return (
      <div className='col-xl-6 col-lg-6 content-right-offset'>
        <div className='sidebar-widget'>
          <div className='bidding-widget'>
            <div className='bidding-headline'><h3>User Praposed Offer</h3></div>
            <div className='bidding-inner'>
              <div className='bidding-widget'>
                <div className='single-page-section'>
                  <div className='notification success closeable'><span><strong>{status}</strong></span></div>
                </div>
              </div>
              {/* <!-- Headline --> */}
              {/* <span className="bidding-detail">Set your <strong>minimal rate</strong></span> */}
              <div className='bidding-fields'>
                <span> <strong>your Request : </strong>{`${userRequest.amount} ${currency} , ${userRequest.days} Days`}</span>
              </div>
              <div className='bidding-fields'>
                <span> <strong>Accepted Proposal : </strong>{`${createrUserRequest.amount} ${currency} , ${createrUserRequest.days} Days`}</span>
              </div>
              <div className='bidding-fields'>
                <span> <strong>Final Proposal : </strong>{`${finalProposalRequest.amount} ${currency} , ${finalProposalRequest.days} Days`}</span>
              </div>

              {/* <!-- Headline --> */}
              <span className='bidding-detail margin-top-30'>Amount to Pay <strong>{`${finalProposalRequest.amount} ${currency}`}</strong></span>

              {/* <!-- Button --> */}
              {/* <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0"> */}

              {/* <button disabled={(currentProposalStatus === 'accepted' ? true : false)} onClick={this.handleOfferAccept} className="popup-with-zoom-anim button ripple-effect"> {currentProposalStatus === 'accepted' && <i className="icon-material-outline-check"></i>} {currentProposalStatus === 'accepted' ? 'Accepted' : ('Accept Offer')}</button> */}
              {/* <button  className="popup-with-zoom-anim button ripple-effect">Accept and Pay </button> */}
              {/* <a href="#small-dialog-2" className="popup-with-zoom-anim button dark ripple-effect"><i className="icon-feather-mail"></i> Send Message</a> */}
              <div>
                <div className='checkbox'>
                  <input type='checkbox' id='chekcbox1' onClick={this.payChecked} checked={this.state.payChecked} />
                  <label for='chekcbox1'><span className='checkbox-icon' /> Click to Accept request and pay</label>
                </div>
                {this.state.payChecked && <div style={{ display: 'inline-block' }}><Paypal finalProposalRequest={finalProposalObj} {...this.props} type='post' /></div>}
                {/* <button className="button dark big margin-top-30" > Cancel</button> */}
                {/* <button style={{ display:'inline-block'} }  className="button dark big margin-top-30" onClick={this.handleOfferReject} title="Reject Reqest"><i className="icon-feather-trash-2"></i>&nbsp;&nbsp;Reject Request</button> */}
              </div>
              {/* </div> */}
              {/* <button  id="snackbar-place-bid" className="button ripple-effect move-on-hover full-width margin-top-30"><span>Accept Pay</span></button> */}

            </div>
            {/* <div className="bidding-signup">Don't have an account? <a href="#sign-in-dialog" className="register-tab sign-in popup-with-zoom-anim">Sign Up</a></div> */}
          </div>
        </div>
      </div>

    )
    // }
    // else if (currentProposalStatus === 'sent') {
    //     return (
    //         <div className="col-xl-6 col-lg-6 content-right-offset">
    //         <div className="sidebar-widget">
    //             <div className="bidding-widget">
    //                 <div className="single-page-section">
    //         <div className="notification success closeable">{status}</div>
    //     </div></div></div></div>)
    // }
    // else if (currentProposalStatus === 'accepted') {
    //     return (<div className="single-page-section">
    //         <div className="notification success closeable">{status}</div>
    //     </div>)
    // }
    // else if (currentProposalStatus === 'rejected') {
    //     return (<div className="single-page-section">
    //         <div className="notification error closeable">{status}</div>
    //     </div>)
    // }
    // else {
    //     return (
    //     <div className="single-page-section">{status}</div>
    //     )
    // }
  }
}
