import React, { Fragment } from 'react'
import { WishlistItem } from './wishlist_item'

export class Favourite extends React.Component {
  constructor () {
    super()
  }

  render () {
    const renderWishlistItem = (this.props.wishlists || []).map(item => {
      return (<WishlistItem whishlist={item} {...this.props} />)
    })

    return (
      <>

        <div class='dashboard-container'>

          {/* <!-- Dashboard Sidebar================================================== --> */}
          <div class='dashboard-sidebar'>
            <div class='dashboard-sidebar-inner' data-simplebar>
              <div class='dashboard-nav-container'>

                {/* <!-- Responsive Navigation Trigger --> */}
                <a href='#' class='dashboard-responsive-nav-trigger'>
                  <span class='hamburger hamburger--collapse'>
                    <span class='hamburger-box'>
                <span class='hamburger-inner' />
              </span>
                  </span>
                  <span class='trigger-title'>Dashboard Navigation</span>
                </a>

                {/* <!-- Navigation --> */}
                <div class='dashboard-nav'>
                  <div class='dashboard-nav-inner'>

                    <ul data-submenu-title='Start'>
                <li><a href='/freelancer/dashboard'><i class='icon-material-outline-dashboard' /> Dashboard</a></li>
                <li class='active'><a href='#'><i class='icon-material-outline-star-border' /> Bookmarks</a></li>
              </ul>

                    <ul data-submenu-title='Organize and Manage' />

                    <ul data-submenu-title='Account'>
                <li><a href='dashboard-settings.html'><i class='icon-material-outline-settings' /> Settings</a></li>
                <li><a href='/logout'><i class='icon-material-outline-power-settings-new' /> Logout</a></li>
              </ul>

                  </div>
                </div>
                {/* <!-- Navigation / End --> */}

              </div>
            </div>
          </div>
          {/* <!-- Dashboard Sidebar / End --> */}

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

        </div>

      </>
    )
  }
}
