import React from 'react'
import { deleteWishlist } from '../../Actions'

export class WishlistItem extends React.Component {
  constructor () {
    super()
    this.deleteBookmark = this.deleteBookmark.bind(this)
  }

  deleteBookmark () {
    deleteWishlist(this.props.whishlist.wishlistId, (err, res) => {
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
      jobCategory,
      skills = [],
      postId,
      priceRange = {},
      currency = '',
      postLogo={url:""}
    } = this.props.whishlist

    const allSkills = skills.map(item => item).join(' | ')

    return (
      <li>
        {/* <!-- Job Listing --> */}
        <div class='job-listing'>

          {/* <!-- Job Listing Details --> */}
          <div class='job-listing-details'>

            {/* <!-- Logo --> */}
            <a href={`/freelancer/post/${postId}`} class='job-listing-company-logo'>
              <img src={postLogo.url?postLogo.url:require('../../assets/images/company-logo-02.png').default} alt='' />
            </a>

            {/* <!-- Details --> */}
            <div class='job-listing-description'>
              <h3 class='job-listing-title'><a href={`/freelancer/post/${postId}`}>{title}</a></h3>

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
          <button onClick={this.deleteBookmark} class='button red ripple-effect ico' title='Remove' data-tippy-placement='left'><i class='icon-feather-trash-2' /></button>
        </div>
      </li>
    )
  }
}
