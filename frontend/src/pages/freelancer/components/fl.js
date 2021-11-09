import React, { Fragment } from 'react'
import { getPostById, getProposal, getUserById, changeProposalStatus } from '../../../Actions'

export class Fl extends React.Component {
  constructor () {
    super()
    this.state = {
      proposalDetails: {},
      userDetails: {},
      post: {}
    }
    this.handleOfferAccept = this.handleOfferAccept.bind(this)
    this.handleOfferReject = this.handleOfferReject.bind(this)
  }

  handleOfferAccept () {
    const body = {
      currentProposalStatus: 'accepted'
    }
    changeProposalStatus(this.state.proposalDetails.proposalId, body, (err, res) => {
      if (err || res.error) {
        alert('error in proposal handle')
        return
      }
      console.log(res.proposalId)
      alert('successfully accepted!')

      this.props.history.push('/hiremngr/post_manage_post')
    })
  }

  handleOfferReject () {
    const body = {
      currentProposalStatus: 'Rejected'
    }
    changeProposalStatus(this.state.proposalDetails.proposalId, body, (err, res) => {
      if (err || res.error) {
        alert('error in proposal handle')
        return
      }
      console.log(res.proposalId)
      alert('successfully rejected!')

      this.props.history.push('/hiremngr/post_manage_post')
    })
  }

  componentDidMount () {
    getPostById(this.props.Bid.postId, {}, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }
      this.setState({ post: res })
    })

    // getUserById(this.props.Bid.freelancerId, (userErr, userDetails) => {
    //     if (userErr || userDetails.error) {
    //         alert('unable to get Bid details')
    //         return
    //     }

    //     this.setState({
    //         userDetails: userDetails
    //     })
    // })
  }

  render () {
    const { freelancerRequest = '', currentProposalStatus = '', createdDate = '', currency = 'INR' } = this.props.Bid
    const { amount = '', days = '', message = '' } = freelancerRequest
    const { username = '', email = '' } = this.state.userDetails
    const { title = '', mainSkill = '', paymentType = '', priceRange = '', jobCategory = '', subSkill = '', location } = this.state.post
    return (
      <>
        <li>
          {/* <!-- Overview --> */}
          <div class='freelancer-overview manage-candidates'>
            <div class='freelancer-overview-inner'>

              {/* <!-- Avatar --> */}
              <div class='freelancer-avatar'>
                <div class='verified-badge' />
                <a href='#'><img src={require('../../../assets/images/user-avatar-big-02.jpg').default} alt='' /></a>
              </div>

              {/* <!-- Name --> */}
              <div class='freelancer-name'>
                <h4><a href='#'>{title} <img class='flag' src={require('../../../assets/images/flags/de.svg').default} alt='' title='Germany' data-tippy-placement='top' /></a></h4>

                {/* <!-- Details --> */}
                <span class='freelancer-detail-item'><a href='#'><i class='icon-feather-mail' /> {email}</a></span>

                {/* <!-- Rating --> */}
                <div class='freelancer-rating'>
                  <div class='star-rating' data-rating='5.0' />
                </div>

                {/* <!-- Bid Details --> */}
                <ul class='dashboard-task-info bid-info'>
                  <li><strong>{amount}{currency}</strong><span>Requested Price</span></li>
                  <li><strong>{days} Days</strong><span>Delivery Time</span></li>
                </ul>

                {/* <!-- Buttons --> */}
                <div class='buttons-to-right always-visible margin-top-25 margin-bottom-0'>
                  {/* <button disabled={(currentProposalStatus === 'accepted' ? true : false)} onClick={this.handleOfferAccept} className="popup-with-zoom-anim button ripple-effect"> {currentProposalStatus === 'accepted' && <i className="icon-material-outline-check"></i>} {currentProposalStatus === 'accepted' ? 'Accepted' : ('Accept Offer')}</button> */}
                  {/* <a href="#small-dialog-2" className="popup-with-zoom-anim button dark ripple-effect"><i className="icon-feather-mail"></i> Send Message</a> */}
                  <button>Accept & Add to calender</button>
                  <button href='#' class='button gray ripple-effect ico' onClick={this.handleOfferReject} title='Remove Bid' data-tippy-placement='top'><i class='icon-feather-trash-2' /></button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  }
}
