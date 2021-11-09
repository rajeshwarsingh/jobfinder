import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import request, { subscribe } from 'superagent'
import Select from 'react-select'
import { createService } from '../../../Actions'
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'

export class Service extends React.Component {
  constructor () {
    super()
  }

  render () {
    console.log('check :', this.props)
    const {
      serviceId,
      title = '',
      description = '',
      location = '',
      createdDate,
      mainSkill,
      subSkill,
      priceRange,
      paymentType,
      currency = 'INR'
    } = this.props.service

    const skills = [mainSkill, ...subSkill]
    const showSkills = skills.map((item, i) => {
      return <span>{item}</span>
    })

    return (
      <>
        <div className='task-listing'>

          {/* <!-- Job Listing Details --> */}
          <div className='task-listing-details'>

            {/* <!-- Details --> */}
            <div className='task-listing-description'>
              <h3 className='task-listing-title'>{title}</h3>
              <ul className='task-icons'>
                <li><i className='icon-material-outline-location-on' /> {location}</li>
                <li><i className='icon-material-outline-access-time' /> {createdDate}</li>
              </ul>
              <p className='task-listing-text'>{description}</p>
              <div className='task-tags'>
                {showSkills}
              </div>
            </div>

          </div>

          <div className='task-listing-bid'>
            <div className='task-listing-bid-inner'>
              <div className='task-offers'>
                <strong>{priceRange}{currency}</strong>
                <span>{paymentType}</span>
              </div>
              <button onClick={this.props.history.push(`/freelancer/service/${serviceId}`)} className='button button-sliding-icon ripple-effect'>Bid Now <i className='icon-material-outline-arrow-right-alt' /></button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
