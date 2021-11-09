import React from 'react'
import { daysDiffernce } from '../../../../utility/index'
import { Link } from 'react-router-dom'

export class ServiceAppliedListItem extends React.Component {
  constructor() {
    super()
    this.state = {
      showImage: true,
      showTitle: true,
      showDescription: true,
      showLocation: true,
      showPriceRange: true,
      showJobType: true,
      showJobCategory: true,
      showLocation: true,
      showAvgRating: true,
      showReview: true
    }
    this.handlePostClick = this.handlePostClick.bind(this)
  }

  handlePostClick() {
    this.props.history.push(`/freelancer/service_applied_manage_bid/${this.props.data.serviceId}`)
  }

  render() {
    console.log('service list creator:', this.props)
    const {
      serviceId = '',
      title,
      description,
      skills,
      serviceLogo = { url: '' },
      paymentType,
      jobCategory,
      currency = 'INR',
      createdDate = '',
    } = this.props.data

    const { currentProposalStatus, finalProposalRequest = { amount: "", days: "", bookingAmount: "", PendingAmount: "" } } = (this.props.data && this.props.data.serviceDetails) ? this.props.data.serviceDetails : {}

    let allSkills = (skills ? skills : []).map((skill, i) => {
      return <span>{skill}</span>
    })

    let status =
      currentProposalStatus === 'not-send' ? <span className='dashboard-status-button green'>Not send</span> :
        currentProposalStatus === 'rejected-by-creater' ? <span className='dashboard-status-button green'>Rejected by creater</span> :
          currentProposalStatus === 'sent' ? <span className='dashboard-status-button green'>Sent</span> :
            currentProposalStatus === 'revised' ? <span className='dashboard-status-button green'>Revised</span> :
              currentProposalStatus === 'revised-by-creater' ? <span className='dashboard-status-button green'>Revised by creater</span> :
                currentProposalStatus === 'rejected' ? <span className='dashboard-status-button green'>Rejected</span> :
                  currentProposalStatus === 'rejected-by-creater' ? <span className='dashboard-status-button green'>Rejected</span> :
                    currentProposalStatus === 'attempted-pay' ? <span className='dashboard-status-button green'>Payment Attempted</span> :
                      currentProposalStatus === 'accepted' ? <span className='dashboard-status-button green'>Accepted</span> :
                        currentProposalStatus === 'accepted-by-creater' ? <span className='dashboard-status-button green'>Accepted by creater</span> :
                          currentProposalStatus === 'booked' ? <span className='dashboard-status-button green'>Booked</span> :
                            currentProposalStatus === 'completed' ? <span className='dashboard-status-button green'>Completed</span> :
                              currentProposalStatus === 'completed-paid' ? <span className='dashboard-status-button green'>payment done</span> : <span className='dashboard-status-button green'>unidentified</span>

    return (
      <div href="single-task-page.html" className="task-listing">

        {/* <!-- Job Listing Details --> */}
        <div className="task-listing-details">

          {/* <!-- Details --> */}
          <div className="task-listing-description">
            <div style={{ display: "inline-block", width: "100%" }}>
              <div style={{ display: "inline-block" }}>
                <img height={40} src={serviceLogo.url || 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg'} alt='' />
              </div>
              <div style={{ display: "inline-block", margin: 10 }}>
                <h3 className="task-listing-title">{title}</h3>
              </div>
              <div style={{ display: "inline-block", margin: 10 }}>
                {status}
              </div>
            </div>
            <ul className="task-icons">
              <li><i className="icon-material-outline-location-on"></i> {jobCategory}</li>
              <li><i className="icon-material-outline-access-time"></i> {daysDiffernce(createdDate, new Date())} days ago</li>
            </ul>
            <p className="task-listing-text">{description}</p>
            <div className="task-tags">
              {allSkills}
            </div>
          </div>

        </div>

        <div className="task-listing-bid">
          <div className="task-listing-bid-inner">
            <div className="task-offers">
              <strong>{finalProposalRequest.amount}{currency}</strong>
              <span>{paymentType}</span>
            </div>
            <Link to={`/freelancer/service/${serviceId}`} className="button button-sliding-icon ripple-effect">Show Details <i className="icon-material-outline-arrow-right-alt"></i></Link>
          </div>
        </div>
      </div>
    )
  }
}
