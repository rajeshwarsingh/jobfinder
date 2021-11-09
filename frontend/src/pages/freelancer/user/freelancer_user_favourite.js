import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getFavouriteUser } from '../../../Actions'
import { FavouriteItem } from '../../../Components/favourite/fav_user_item'

export class FreelancerUserFavourite extends React.Component {
  constructor () {
    super()
    this.state = {
      favourite: []
    }
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
        favouriteUserId: true,
        freelancerId: true,
        userId: true,
        title: true,
        userLogo: true,
        skills: true,
        priceRange: true,
        jobCategory: true,
        updatedTime: true
      }
    }

    getFavouriteUser(filter, (err, favRes) => {
      console.log('all favourite ----Service result:', err, favRes)
      if (err) {
        console.log('error in favouriteService')
      }
      if (favRes.length) {
        this.setState({ favourite: favRes })
      }
    })
  }

  render () {
    const renderFavouriteItem = (this.state.favourite || []).map(item => {
      return (<FavouriteItem favourite={item} {...this.props} />)
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
                {renderFavouriteItem}
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
