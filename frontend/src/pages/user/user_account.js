import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export class UserAccount extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <>
        {/* <!-- Dashboard Container --> */}
        <div className='dashboard-container'>

          {/* <!-- Dashboard Sidebar================================================== --> */}
          <div className='dashboard-sidebar'>
            <div className='dashboard-sidebar-inner' data-simplebar>
              <div className='dashboard-nav-container'>

                {/* <!-- Responsive Navigation Trigger --> */}
                <a href='#' className='dashboard-responsive-nav-trigger'>
                  <span className='hamburger hamburger--collapse'>
                    <span className='hamburger-box'>
                <span className='hamburger-inner' />
              </span>
                  </span>
                  <span className='trigger-title'>Dashboard Navigation</span>
                </a>

                {/* <!-- Navigation --> */}
                <div className='dashboard-nav'>
                  <div className='dashboard-nav-inner'>

                    <ul data-submenu-title='Start'>
                <li><a href='dashboard.html'><i className='icon-material-outline-dashboard' /> Dashboard</a></li>
                <li><a href='dashboard-bookmarks.html'><i className='icon-material-outline-star-border' /> Bookmarks</a></li>
              </ul>

                    <ul data-submenu-title='Organize and Manage' />

                    <ul data-submenu-title='Account'>
                <li className='active'><a href='dashboard-settings.html'><i className='icon-material-outline-settings' /> Settings</a></li>
                <li><a href='index-logged-out.html'><i className='icon-material-outline-power-settings-new' /> Logout</a></li>
              </ul>

                  </div>
                </div>
                {/* <!-- Navigation / End --> */}

              </div>
            </div>
          </div>
          {/* <!-- Dashboard Sidebar / End --> */}

          {/* <!-- Dashboard Content================================================== --> */}
          <div className='dashboard-content-container' data-simplebar>
            <div className='dashboard-content-inner'>

              {/* <!-- Dashboard Headline --> */}
              <div className='dashboard-headline'>
                <h3>Settings</h3>

                {/* <!-- Breadcrumbs --> */}
                <nav id='breadcrumbs' className='dark'>
                  <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Dashboard</a></li>
                    <li>Settings</li>
                  </ul>
                </nav>
              </div>

              {/* <!-- Row --> */}
              <div className='row'>

                {/* <!-- Dashboard Box --> */}
                <div className='col-xl-12'>
                  <div className='dashboard-box margin-top-0'>

                    {/* <!-- Headline --> */}
                    <div className='headline'>
                <h3><i className='icon-material-outline-account-circle' /> My Account</h3>
              </div>

                    <div className='content with-padding padding-bottom-0'>

                <div className='row'>

                            <div className='col-auto'>
                                <div className='avatar-wrapper' data-tippy-placement='bottom' title='Change Avatar'>
                                    <img className='profile-pic' src='images/user-avatar-placeholder.png' alt='' />
                                    <div className='upload-button' />
                                    <input className='file-upload' type='file' accept='image/*' />
                                  </div>
                              </div>

                            <div className='col'>
                                <div className='row'>

                                    <div className='col-xl-6'>
                                        <div className='submit-field'>
                                            <h5>Username</h5>
                                            <input type='text' className='with-border' value='Tom' />
                                          </div>
                                      </div>

                                    <div className='col-xl-6'>
                                        {/* <!-- Account Type --> */}
                                        <div className='submit-field'>
                                            <h5>Account Type</h5>
                                            <div className='account-type'>
                                                <div>
                                                    <input type='radio' name='account-type-radio' id='freelancer-radio' className='account-type-radio' checked />
                                                    <label htmlFor='freelancer-radio' className='ripple-effect-dark'><i className='icon-material-outline-account-circle' /> Freelancer</label>
                                                  </div>

                                                <div>
                                                    <input type='radio' name='account-type-radio' id='employer-radio' className='account-type-radio' />
                                                    <label htmlFor='employer-radio' className='ripple-effect-dark'><i className='icon-material-outline-business-center' /> Employer</label>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>

                                    <div className='col-xl-6'>
                                        <div className='submit-field'>
                                            <h5>Email</h5>
                                            <input type='text' className='with-border' value='tom@example.com' />
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>

              </div>
                  </div>
                </div>

                {/* <!-- Dashboard Box --> */}
                <div className='col-xl-12'>
                  <div id='test1' className='dashboard-box'>

                    {/* <!-- Headline --> */}
                    <div className='headline'>
                <h3><i className='icon-material-outline-lock' /> Password & Security</h3>
              </div>

                    <div className='content with-padding'>
                <div className='row'>
                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Current Password</h5>
                                    <input type='password' className='with-border' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>New Password</h5>
                                    <input type='password' className='with-border' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Repeat New Password</h5>
                                    <input type='password' className='with-border' />
                                  </div>
                              </div>

                            <div className='col-xl-12'>
                                <div className='checkbox'>
                                    <input type='checkbox' id='two-step' checked />
                                    <label htmlFor='two-step'><span className='checkbox-icon' /> Enable Two-Step Verification via Email</label>
                                  </div>
                              </div>
                          </div>
              </div>
                  </div>
                </div>

                {/* <!-- Button --> */}
                <div className='col-xl-12'>
                  <a href='#' className='button ripple-effect big margin-top-30'>Save Changes</a>
                </div>

              </div>
              {/* <!-- Row / End --> */}

              {/* <!-- Footer --> */}
              <div className='dashboard-footer-spacer' />
              <div className='small-footer margin-top-15'>
                <div className='small-footer-copyrights'>
                  © 2021 <strong>jobviously</strong>. All Rights Reserved.
                </div>
                <ul className='footer-social-links'>
                  <li>
                    <a href='#' title='Facebook' data-tippy-placement='top'>
                <i className='icon-brand-facebook-f' />
              </a>
                  </li>
                  <li>
                    <a href='#' title='Twitter' data-tippy-placement='top'>
                <i className='icon-brand-twitter' />
              </a>
                  </li>
                  <li>
                    <a href='#' title='Google Plus' data-tippy-placement='top'>
                <i className='icon-brand-google-plus-g' />
              </a>
                  </li>
                  <li>
                    <a href='#' title='LinkedIn' data-tippy-placement='top'>
                <i className='icon-brand-linkedin-in' />
              </a>
                  </li>
                </ul>
                <div className='clearfix' />
              </div>
              {/* <!-- Footer / End --> */}

            </div>
          </div>
          {/* <!-- Dashboard Content / End --> */}

        </div>
        {/* <!-- Dashboard Container / End --></div> */}
      </>
    )
  }
}
