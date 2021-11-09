import React from 'react'
import { deleteFavouriteService } from '../../Actions'

export class FavouriteItem extends React.Component {
  constructor () {
    super()
    this.deleteFavourite = this.deleteFavourite.bind(this)
  }

  deleteFavourite () {
    deleteFavouriteService(this.props.favourite.favouriteServiceId, (err, res) => {
      if (err) {
        alert(err)
        return
      }
      alert('deleted successfully!')
      return window.location.reload(false)
    })
  }

  render () {
    const {
      title,
      serviceId="",
      jobCategory,
      serviceLogo={url:""},
      skills = [],
      priceRange = {},
      currency = ''
    } = this.props.favourite

    const allSkills = skills.map(item => item).join(' | ')

    return (
      <li>
        {/* <!-- Job Listing --> */}
        <div class='job-listing'>

          {/* <!-- Job Listing Details --> */}
          <div class='job-listing-details'>

            {/* <!-- Logo --> */}
            <button class='job-listing-company-logo'>
              <img src={serviceLogo.url?serviceLogo.url:require('../../assets/images/company-logo-02.png').default} alt='' />
            </button>

            {/* <!-- Details --> */}
            <div class='job-listing-description'>
              <h3 class='job-listing-title'><a href={`/freelancer/service/${serviceId}`}>{title}</a></h3>

              {/* <!-- Job Listing Footer --> */}
              <div class='job-listing-footer'>
                <ul>
                  <li><i class='icon-material-outline-business' /> {allSkills}</li>
                  <li><i class='icon-material-outline-business-center' /> {jobCategory}</li>
                  <li><i class='icon-material-outline-access-time' /> {`${priceRange.min}-${priceRange.max}/${currency}`}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Buttons --> */}
        <div class='buttons-to-right'>
          <button onClick={this.deleteFavourite} class='button red ripple-effect ico' title='Remove' data-tippy-placement='left'><i class='icon-feather-trash-2' /></button>
        </div>
      </li>
    )
  }
}
