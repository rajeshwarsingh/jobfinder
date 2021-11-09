import React from 'react'
import { deleteFavouriteUser } from '../../Actions'

export class FavouriteItem extends React.Component {
  constructor () {
    super()
    this.deleteFavourite = this.deleteFavourite.bind(this)
  }

  deleteFavourite () {
    deleteFavouriteUser(this.props.favourite.favouriteUserId, (err, res) => {
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
      title="",
      freelancerId="",
      jobCategory=[],
      userLogo={url:''},
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
            <a href={`/freelancer/search_details/${freelancerId}`} class='job-listing-company-logo'>
              <img src={(userLogo.url?userLogo.url:require('../../assets/images/user-avatar-placeholder.png').default)} alt='' />
            </a>

            {/* <!-- Details --> */}
            <div class='job-listing-description'>
              <h3 class='job-listing-title'><a href={`/freelancer/search_details/${freelancerId}`}>{title}</a></h3>

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
