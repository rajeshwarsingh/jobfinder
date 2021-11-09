import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { daysDiffernce } from '../../../utility/index'

export class ServiceListCreaterItem extends React.Component {
  constructor () {
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
    this.manageBidderClick = this.manageBidderClick.bind(this)
  }

  manageBidderClick () {
    const { serviceId = '', title = '', currency = '', priceRange = {}, createdDate = '', paymentType = '', expectedDuration = '' } = this.props.service
    this.props.history.push(`/freelancer/service_manage_bidders/${serviceId}?title=${title}&currency=${currency}&min=${priceRange.min}&max=${priceRange.max}&expectedDuration=${expectedDuration}&paymentType=${paymentType}&createdDate=${createdDate}`)
  }

  render () {
    console.log('service list creator:', this.props)
    const {
      serviceId = '',
      title = '',
      serviceLogo = { url: '' },
      serviceBg = { url: '' },
      files = [],
      description = '',
      skills = [],
      location = [],
      priceRange = { min: '', max: '' },
      paymentType = '',
      jobType = '',
      jobCategory = '',
      avgRating = '',
      review = '',
      currency = '',
      createdDate = '',
      block = ''
    } = this.props.service

    // description = description.length >90?description.substr(0,40):description
    return (
      <>
        <li>
          {/* <!-- Job Listing --> */}
          <div class='job-listing width-adjustment'>

            {/* <!-- Job Listing Details --> */}
            <div class='job-listing-details'>

              {/* <!-- Details --> */}
              <div class='job-listing-description'>
                <h3 class='job-listing-title'><Link to={`/freelancer/service/${serviceId}?userType=creater`}>{title}</Link> </h3>

                {/* <!-- Job Listing Footer --> */}
                <div class='job-listing-footer'>
                  <ul>
                    <li><i class='icon-material-outline-access-time' />{daysDiffernce(createdDate, new Date())} days ago</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Task Details --> */}
          <ul class='dashboard-task-info'>
            {/* <li><strong>3</strong><span>Bids</span></li> */}
            <li><strong>{`${priceRange.min}/${currency}`}</strong><span>{paymentType}</span></li>
          </ul>

          {/* <!-- Buttons --> */}
          <div class='buttons-to-right always-visible'>
            <button onClick={this.manageBidderClick} class='button ripple-effect'><i class='icon-material-outline-supervisor-account' /> Manage Bidders </button>
            {/* <a href='#' class='button gray ripple-effect ico' title='Edit' data-tippy-placement='top'><i class='icon-feather-edit' /></a>
            <a href='#' class='button gray ripple-effect ico' title='Remove' data-tippy-placement='top'><i class='icon-feather-trash-2' /></a> */}
          </div>
        </li>
      </>
    )
  }
}
