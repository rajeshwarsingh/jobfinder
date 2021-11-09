import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'
import config from '../config'
const { displayNameSettings,baseFrontenUrl } = config
var loadjs = require('loadjs');

export class FreelancerDashboardSidebar extends Component {

  componentWillMount() {
		// loadjs(baseFrontenUrl+'/js/bootstrap-select.min.js');
		// loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
		// loadjs(baseFrontenUrl+'/js/chart.min.js');
		// loadjs(baseFrontenUrl+'/js/clipboard.min.js');
		// loadjs(baseFrontenUrl+'/js/counterup.min.js');
		// loadjs(baseFrontenUrl+'/js/counterup.min.js');
		// loadjs(baseFrontenUrl+'/js/custom.js');
		// loadjs(baseFrontenUrl+'/js/infobox.min.js');
		// loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
		// loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
		// loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
		// loadjs(baseFrontenUrl+'/js/leaflet.min.js');
		// loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
		// loadjs(baseFrontenUrl+'/js/maps.js');
		// loadjs(baseFrontenUrl+'/js/markerclusterer.js');
		// loadjs(baseFrontenUrl+'/js/mmenu.min.js');
		// loadjs(baseFrontenUrl+'/js/simplebar.min.js');
		// loadjs(baseFrontenUrl+'/js/snackbar.js');
		// loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
  }
  
  render () {
    return (
    // <!-- Dashboard Sidebar================================================== -->
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
                  <li><Link to={this.props.path === '/freelancer/dashboard' ? '#' : '/freelancer/dashboard'}><i className='icon-material-outline-dashboard' /> Dashboard</Link></li>
                  <li><Link to={this.props.path === `/freelancer/search_details/${ls.get('userId')}` ? '#' : `/freelancer/search_details/${ls.get('userId')}?userType=creater`}><i className='icon-material-outline-rate-review' /> Profile options</Link></li>
                  <li><Link to={this.props.path === '/freelancer/service_list' ? '#' : '/freelancer/service_list'}><i className='icon-material-outline-question-answer' /> {displayNameSettings.service} </Link></li>
                  {/* <li><Link to={this.props.path === '/freelancer/service_list' ? '#' : '/freelancer/service_list'}><i className='icon-material-outline-question-answer' /> {displayNameSettings.service} </Link></li> */}
                  <li><Link to={this.props.path === '/hiremngr/post_manage_post' ? '#' : '/hiremngr/post_manage_post'}><i className='icon-material-outline-question-answer' />{displayNameSettings.post}s </Link></li>

                </ul>

                <ul data-submenu-title='Organize and Manage'>
                  <li className='active-submenu'><a href='#'><i className='icon-material-outline-business-center' /> Manage</a>
                    <ul>
                      {/* <li><Link to={this.props.path === '/hiremngr/post_manage_post' ? '#' : '/hiremngr/post_manage_post'}>Manage {displayNameSettings.post}s <span className='nav-tag'>`{ls.get('countPostMng')}`</span></Link></li> */}
                      <li><Link to='/freelancer/service_applied_list'>Applied {displayNameSettings.service}s </Link></li>
                      <li><Link to='/freelancer/post_applied_manage_post'>Applied {displayNameSettings.post}s </Link></li>
                    </ul>
                  </li>

                  <li className='active-submenu'><a href='#'><i className='icon-material-outline-assignment' /> Favourites</a>
                    <ul>
                      <li><Link to={this.props.path === '/freelancer/wishlist' ? '#' : '/freelancer/wishlist'}><i className='icon-material-outline-star-border' /> {displayNameSettings.post}</Link></li>
                      <li><Link to={this.props.path === '/freelancer/favourite' ? '#' : '/freelancer/favourite'}><i className='icon-material-outline-star-border' /> {displayNameSettings.service}</Link></li>
                      <li><Link to={this.props.path === '/freelancer/user_favourite' ? '#' : '/freelancer/user_favourite'}><i className='icon-material-outline-star-border' /> {displayNameSettings.freelancer}</Link></li>
                    </ul>
                  </li>
                </ul>

                <ul data-submenu-title='Account'>
                  <li><a href='/freelancer/setting'><i className='icon-material-outline-settings' /> Settings</a></li>
                  <li><a href='/logout'><i className='icon-material-outline-power-settings-new' /> Logout</a></li>
                </ul>

              </div>
            </div>
            {/* <!-- Navigation / End --> */}

          </div>
        </div>
      </div>
	        // <!-- Dashboard Sidebar / End -->
    )
  }
}
