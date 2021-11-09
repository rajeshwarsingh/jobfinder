
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getJobs } from '../../Actions'

export class JobSearchItem extends React.Component {
  constructor () {
    super()
  }

  componentDidMount () {
  }

  render () {
    const {
      jobId,
      companyName,
      title,
      description,
      location,
      jobFunType,
      skills,
      empType,
      createdDate
    } = this.props.job
    return (
      <>
        {/* <!-- Job Listing --> */}
        <a href={`/freelancer/job_details/${jobId}`} className='job-listing'>

          {/* <!-- Job Listing Details --> */}
          <div className='job-listing-details'>
            {/* <!-- Logo --> */}
            <div className='job-listing-company-logo'>
              <img src='images/company-logo-01.png' alt='' />
            </div>

            {/* <!-- Details --> */}
            <div className='job-listing-description'>
              <h4 className='job-listing-company'>{companyName} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
              <h3 className='job-listing-title'>{jobFunType}</h3>
              <p className='job-listing-text'>{description}</p>
            </div>

            {/* <!-- Bookmark --> */}
            <span className='bookmark-icon' />
          </div>

          {/* <!-- Job Listing Footer --> */}
          <div className='job-listing-footer'>
            <ul>
              <li><i className='icon-material-outline-location-on' /> {location}</li>
              <li><i className='icon-material-outline-business-center' /> {empType}</li>
              <li><i className='icon-material-outline-account-balance-wallet' /> $35000-$38000</li>
              <li><i className='icon-material-outline-access-time' /> {createdDate}</li>
            </ul>
          </div>
        </a>
      </>
    )
  }
}
