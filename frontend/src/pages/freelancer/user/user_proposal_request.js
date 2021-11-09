import ls from 'local-storage'
import React, { Fragment } from 'react'
import { getUserProposal, createUserProposal } from '../../../Actions'

export class UserProposalRequest extends React.Component {
  constructor () {
    super()
    this.state = {
      reqAmount: '0',
      reqDays: '0',
      finalAmount: '0',
      currentProposalStatus: 'not-send'
    }
    this.onDaysChange = this.onDaysChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.handleProposalRequest = this.handleProposalRequest.bind(this)

    // this.bidAmountChange = this.bidAmountChange.bind(this)
    // this.bidDaysChange = this.bidDaysChange.bind(this)
    // this.handleBidRequest = this.handleBidRequest.bind(this)
    // this.bidMessageChange = this.bidMessageChange.bind(this)
    // this.handleBidQualifyRequest = this.handleBidQualifyRequest.bind(this)
    // this.getProposaldata = this.getProposaldata.bind(this)
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
      userId: this.props.userData.userId,
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
        userId: this.props.userData.userId,
        createrUserId: this.props.userData.userId
      },
      fields: {
        userProposalId: true,
        userId: true,
        userId: true,
        createrUserId: true,
        currentProposalStatus: true,
        proposalTime: false,
        paymentType: false,
        createrUserRequest: false,
        userRequest: false,
        finalProposalRequest: false,
        updatedTime: false
      }
    }

    getUserProposal(filter, (err, res) => {
      console.log('get proposal details:', err, res)
      if (err) {
        alert('error in fetching proposal details!', err)
        return
      }

      if (res && res.length && res[0].userProposalId) {
        this.setState({ currentProposalStatus: (res[0].currentProposalStatus ? res[0].currentProposalStatus : 'not-send'), proposal: res })
      } else {
        this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
      }
    })
  }

  componentDidMount () {
    // CALL METHOD AFTER 1 SEC BECUSE REACT TAKS TIME TO LOAD THE PARENTS PROPS DATA, WHERES AS KEY WILL BE THERE
    setTimeout(() => {
      this.getProposaldata()
    }, 1000)
  }

  render () {
    const {
      currency = '',
      paymentType = ''
    } = this.props.userData

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

    { /* User can apply 1 time only and with status is 'not-send' */ }

    if (this.state.currentProposalStatus === 'not-send' || this.state.currentProposalStatus === 'revised') {
      return (
        <div className='col-xl-6 col-lg-6 content-right-offset'>
          <div className='sidebar-widget'>
            <div className='bidding-widget'>
              <div className='bidding-headline'><h3>Bid on this User!</h3></div>
              <div className='bidding-inner'>

                {/* <!-- Headline --> */}
                <span>Set your <strong>minimal rate</strong></span><br />

                {/* <!-- Price Slider --> */}
                <div className='input-with-icon'>
                  <input value={this.state.reqAmount} onChange={this.onAmountChange} className='with-border' type='text' />
                  <i className='currency'>{currency}</i>
                </div>
                <span>{`${(paymentType === 'BY-The-Hour') ? 'Hourly' : 'Fixed Price'}`}</span>
                {/* <!-- Headline --> */}
                <span className='bidding-detail margin-top-30'>Set your <strong>delivery Days</strong></span>

                {/* <!-- Fields --> */}
                <div className='bidding-fields'>
                  <div className='bidding-field'>
                    {/* <!-- Quantity Buttons --> */}
                    <div className='qtyButtons'>
                      {/* <div className="qtyDec"></div> */}
                      <input type='text' value={this.state.reqDays} onChange={this.onDaysChange} />
                    </div>
                  </div>

                </div>

                {/* <!-- Button --> */}
                <button onClick={this.handleProposalRequest} id='snackbar-place-bid' className='button ripple-effect move-on-hover full-width margin-top-30'><span>Place a Request</span></button>

              </div>
            </div>
          </div>
        </div>

      )
    }

    else {
      return (
        <div className='col-xl-6 col-lg-6 content-right-offset'>
          <div className='sidebar-widget'>
            <div className='bidding-widget'>
              <div className='bidding-headline'><h3>Bid on this User!</h3></div>
              <div className='bidding-inner'>
                <div className='single-page-section'>
                  <div className='notification success closeable'><span><strong>{status}</strong></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
  }
}
