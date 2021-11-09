import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'
import { getWishlist } from '../../Actions'
import { Wishlist } from '../../Components/favourite/wishlist'
import { WishlistItem } from '../../Components/favourite/wishlist_item'

export class FreelancerPostWishlist extends React.Component {
  constructor () {
    super()
    this.state = {
      wishlists: []
    }
    //   this.state = {color: "red"};
  }

  componentDidMount () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        userId: ls.get('userId')
      },
      fields: {
        wishlistId: true,
        postId: true,
        userId: true,
        title: true,
        postLogo: true,
        skills: true,
        priceRange: true,
        jobCategory: true,
        updatedTime: true
      }
    }

    getWishlist(filter, (err, wishRes) => {
      console.log('all wishlist result:', err, wishRes)
      if (err) {
        console.log('error in wishlist')
      }
      if (wishRes.length) {
        this.setState({ wishlists: wishRes })
      }
    })
  }

  render () {
    const renderWishlistItem = (this.state.wishlists || []).map(item => {
      return (<WishlistItem whishlist={item} {...this.props} />)
    })

    return (
      <>

        {/* <!-- Dashboard Content================================================== --> */}
        <div class='dashboard-content-container' data-simplebar>
          <div class='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div class='dashboard-headline'>
              <h3>Bookmarks</h3>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' class='dark'>
                <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Dashboard</a></li>
                  <li>Bookmarks</li>
                </ul>
              </nav>
            </div>

            {/* <!-- Row --> */}
            <div class='row'>

              {/* <!-- Dashboard Box --> */}
              <div class='col-xl-12'>
                <div class='dashboard-box margin-top-0'>

                  {/* <!-- Headline --> */}
                  <div class='headline'>
                    <h3><i class='icon-material-outline-business-center' /> Bookmarked Jobs</h3>
                  </div>

                  <div class='content'>
                    <ul class='dashboard-box-list'>
                {renderWishlistItem}
              </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Dashboard Box --> */}
              {/* <div className="col-xl-12">
                                <div className="dashboard-box">
                                    <div className="headline">
                                        <h3><i className="icon-material-outline-face"></i> Bookmarked Freelancers</h3>
                                    </div>

                                    <div className="content">
                                        <ul className="dashboard-box-list">
                                            <WishlistItemFreelancer/></ul>
                                    </div>
                                </div>
                            </div> */}

            </div>
            {/* <!-- Row / End --> */}

            {/* <!-- Footer --> */}
            <div class='dashboard-footer-spacer' />
            <div class='small-footer margin-top-15'>
              <div class='small-footer-copyrights'>
                © 2021 <strong>jobviously</strong>. All Rights Reserved.
              </div>
              <ul class='footer-social-links'>
                <li>
                  <a href='#' title='Facebook' data-tippy-placement='top'>
                    <i class='icon-brand-facebook-f' />
                  </a>
                </li>
                <li>
                  <a href='#' title='Twitter' data-tippy-placement='top'>
                    <i class='icon-brand-twitter' />
                  </a>
                </li>
                <li>
                  <a href='#' title='Google Plus' data-tippy-placement='top'>
                    <i class='icon-brand-google-plus-g' />
                  </a>
                </li>
                <li>
                  <a href='#' title='LinkedIn' data-tippy-placement='top'>
                    <i class='icon-brand-linkedin-in' />
                  </a>
                </li>
              </ul>
              <div class='clearfix' />
            </div>
            {/* <!-- Footer / End --> */}

          </div>
        </div>
        {/* <!-- Dashboard Content / End --> */}

      </>
    )
  }
}
