import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getProposal, getUserById, changeProposalStatus, HandlepaypalSubscription } from '../../../Actions'
import Paypal from '../../../Components/payment/PaymentPaypal'
import PaypalButtonSubscrition from '../../../Components/payment/paypal_subscrition/App'
const Spinner = require('react-spinkit')

export class Bidder extends React.Component {
  constructor() {
    super()
    this.state = {
      // proposalDetails: {},
      userDetails: {},
      payBookedChecked: false,
      payFinalChecked: false,
      paymentType: 'booked',
      showPaypalButton: false,
      planId: ''
    }
    // this.handleOfferAccept = this.handleOfferAccept.bind(this)
    this.handleOfferReject = this.handleOfferReject.bind(this)
    this.getUserdata = this.getUserdata.bind(this)
    this.payBookedChecked = this.payBookedChecked.bind(this)
    this.payFinalChecked = this.payFinalChecked.bind(this)
    this.handleOnsubscription = this.handleOnsubscription.bind(this)
    // this.getProposalData = this.getProposalData.bind(this)
  }

  payBookedChecked(e) {
    console.log('payBookedChecked:', e.target.checked)
    this.setState({ payBookedChecked: (!this.state.payBookedChecked), payFinalChecked: false, paymentType: 'booked' })
  }

  payFinalChecked(e) {
    console.log('payFinalChecked:', e.target.checked)
    if (!this.state.payFinalChecked) {
      // this.props.Bidder.userRequest.amount
      // this.props.post.currency
      // console.log("#####################",this.props.post)
      // CREATE PLAN ID FOR SUBSCRIPTION OF PAYPAL API
      const body = {
        productDetails: {
          name: this.props.post.title || '',
          description: 'description of post',
          type: 'SERVICE',
          category: 'SOFTWARE',
          image_url: 'https://example.com/streaming.jpg',
          home_url: 'https://example.com/home',
          price: this.props.Bidder.userRequest.amount || '',
          currency: this.props.post.currency || ''
        }
      }

      console.log('body:', body)

      HandlepaypalSubscription(body, (err, { planId }) => {
        // alert(planId)
        if (planId) {
          return this.setState({ showPaypalButton: true, planId: planId })
        }
        alert('something went wrong comeback later!')
      })
    }
    this.setState({ payFinalChecked: (!this.state.payFinalChecked), payBookedChecked: false, paymentType: 'completed-paid' })
  }

  // handleOfferAccept() {
  //   const body = {
  //     currentProposalStatus: 'accepted'
  //   }
  //   changeProposalStatus(this.state.proposalDetails.proposalId, body, (err, res) => {
  //     if (err || res.error) {
  //       alert('error in proposal handle')
  //       return
  //     }
  //     console.log(res.proposalId)
  //     alert('successfully accepted!')

  //     this.props.history.push('/hiremngr/post_manage_post')
  //   })
  // }

  handleOfferReject() {
    const body = {
      currentProposalStatus: 'Rejected'
    }
    changeProposalStatus(this.props.Bidder.proposalId, body, (err, res) => {
      if (err || res.error) {
        alert('error in proposal handle')
        return
      }
      console.log(res.proposalId)
      alert('successfully rejected!')

      this.props.history.push('/hiremngr/post_manage_post')
    })
  }

  getUserdata() {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
        userId: true,
        email: true,
        firstName: true,
        lastName: true,
        userLogo: true,
        about: true,
        skills: true,
        nationalitySelected: true,
        pic: true
      }
    }

    getUserById(this.props.Bidder.userId, filter, (userErr, userDetails) => {
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
    // call method after 1 sec becuse react takes time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getUserdata()
    }, 1000)
  }

  handleOnsubscription() {
    alert('subscription')
  }

  render() {
    
    const { proposalId, userId, userRequest = {}, currentProposalStatus, subscribe ,questionnaireObj = { answer: {} } } = this.props.Bidder// proposal details

    const {
      email = '', firstName = '', lastName = '',
      userLogo = { url: '' }
    } = this.state.userDetails

    const { NoOfWeeks = "", currency = '' } = this.props.post

    const { amount = '', hours = '' } = userRequest
    // const { skip, currect, wrong } = questionnaireObj.answer

    // on pyachecked create final proposal
    let finalProposalObj = {}

    if (this.state.payBookedChecked || this.state.payFinalChecked) {
      finalProposalObj = {
        amount: userRequest.amount, // final Amount of service
        bookingAmount: (parseInt(userRequest.amount) * 10) / 100,
        PendingAmount: userRequest.PendingAmount,
        hours: userRequest.hours,
        currency,
        paymentType: this.state.paymentType, // booked or completed-paid
        proposalId: proposalId,
        type: 'post'
      }
      
    }

    return (
      <>
        <li>
          {/* <!-- Overview --> */}
          <div className='freelancer-overview manage-candidates'>
            <div className='freelancer-overview-inner'>

              {/* <!-- Avatar --> */}
              <div className='freelancer-avatar'>
                <div className='verified-badge' />
                <a href='#'><img src={userLogo.url?userLogo.url:require('../../../assets/images/user-avatar-placeholder.png').default} alt='' /></a>
              </div>

              {/* <!-- Name --> */}
              <div className='freelancer-name'>

                <h4 style={{ display: 'inline-block' }}><Link to={`/freelancer/search_details/${userId}?currPraposalId=${proposalId}`}>{firstName} {lastName} <img className='flag' src={require('../../../assets/images/flags/de.svg')} alt='' title='Germany' data-tippy-placement='top' /></Link></h4>
                <span style={{ display: 'inline-block' }} class={currentProposalStatus === 'completed-paid' ? "dashboard-status-button green":currentProposalStatus === 'Rejected'?"dashboard-status-button red":"dashboard-status-button yellow"}>{(currentProposalStatus === 'completed-paid' && subscribe===true) ? "Subscribed":(currentProposalStatus === 'completed-paid' && subscribe===false) ? "Unsubscribed" :currentProposalStatus === 'Rejected'?"Rejected": "Subscription Pending"}</span>

                {/* <!-- Details --> */}
                <span style={{ display: 'block' }} className='freelancer-detail-item'><a href='#'><i className='icon-feather-mail' /> {email}</a></span>

                {/* <!-- Rating --> */}
                {/* <div className='freelancer-rating'>
                  <div className='star-rating' data-rating='5.0' />
                  {questionnaireSelected && <div style={{ display: 'flex' }}><button style={{ display: 'inline-block' }} onClick={() => this.props.history.push(`/showQuiz/${proposalId}`)} className='verified-badge-with-title' style={{ width: '180px' }}>Need to qualify</button> <lable style={{ display: 'inline-block' }}>{`currect : ${currect}, wrong : ${wrong}, skip : ${skip}, ${currect >= passingQuesCount ? 'Pass' : 'Failed'}`} </lable></div>}
                </div> */}

                {/* <!-- Bid Details --> */}
                <ul className='dashboard-task-info bid-info'>
                  <li><strong>{amount}{currency}</strong><span>Requested Price</span></li>
                  <li><strong>{hours} Hours/Per Week</strong><span>Delivery Time</span></li>
                  <li><strong>{NoOfWeeks} </strong><span>Total Weeks</span></li>
                </ul>

                {/* <!-- Buttons --> */}
                <div className='buttons-to-right always-visible margin-top-25 margin-bottom-0'>
                  {!(currentProposalStatus === 'completed-paid' || currentProposalStatus === 'Rejected') && <div className='checkbox'>
                    {/* <PaypalButtonSubscrition {...this.props} finalProposalObj={finalProposalObj} type='post' {...this.props} postData={this.props.post}/> */}
                    <input type='checkbox' id={`payfinalId${this.props.itemIndex}`} onClick={this.payFinalChecked} checked={this.state.payFinalChecked} />
                    <label for={`payfinalId${this.props.itemIndex}`}><span className='checkbox-icon' /> Subscribe and Pay</label>
                  </div>}
                  {currentProposalStatus === 'completed-paid' && 
                    <div style={{height:32.2}}><Link to={`/freelancer/search_details/${userId}?currPraposalId=${proposalId}`}>show details</Link></div>
                    }
                  <div>
                    {this.state.payFinalChecked  &&
                      <div className='checkbox'>
                        <div style={{ alignContent: 'center' }}>
                          {!this.state.showPaypalButton && <Spinner name='line-scale' color='blue' />}
                        </div>
                        <div style={{ alignContent: 'center' }}>
                          {this.state.showPaypalButton && <PaypalButtonSubscrition {...this.props} finalProposalObj={finalProposalObj} type='post' {...this.props} postData={this.props.post} planId={this.state.planId} />}
                        </div>
                      </div>}
                      <br/>
                    {!(currentProposalStatus === 'completed-paid' || currentProposalStatus === 'Rejected') && 
                    <div style={{height:32.2}}><button  className='button dark' onClick={this.handleOfferReject} title=''><i className='icon-feather-trash-2' />&nbsp;&nbsp;Reject Request</button></div>
                    }
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  }
}
