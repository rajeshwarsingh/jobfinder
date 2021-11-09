import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
const { displayNameSettings,baseFrontenUrl } = config
var loadjs = require('loadjs');

export class Header extends Component {

// 	componentWillMount() {
// 		loadjs(baseFrontenUrl+'/js/bootstrap-select.min.js');
// 		loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
// 		loadjs(baseFrontenUrl+'/js/chart.min.js');
// 		loadjs(baseFrontenUrl+'/js/clipboard.min.js');
// 		loadjs(baseFrontenUrl+'/js/counterup.min.js');
// 		loadjs(baseFrontenUrl+'/js/counterup.min.js');
// 		loadjs(baseFrontenUrl+'/js/custom.js');
// 		loadjs(baseFrontenUrl+'/js/infobox.min.js');
// 		loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
// 		loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
// 		loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
// 		loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
// 		loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
// 		loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
// 		loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
// 		loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
// 		loadjs(baseFrontenUrl+'/js/leaflet.min.js');
// 		loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
// 		loadjs(baseFrontenUrl+'/js/maps.js');
// 		loadjs(baseFrontenUrl+'/js/markerclusterer.js');
// 		loadjs(baseFrontenUrl+'/js/mmenu.min.js');
// 		loadjs(baseFrontenUrl+'/js/simplebar.min.js');
// 		loadjs(baseFrontenUrl+'/js/snackbar.js');
// 		loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
//   }
  
	render() {
		return (
			//  ======================Header Container============================ -->

			<header id='header-container' className='fullwidth'>

				{/* <!-- Header --> */}
				<div id='header'>
					<div className='container'>

						{/* <!-- Left Side Content --> */}
						<div className='left-side'>

							{/* <!-- Logo --> */}
							<div id='logo'>
								<a href='/' style={{display: "grid"}}><img src={require('../assets/images/JBLogo.svg').default} alt='' /></a>
							</div>

							{/* <!-- Main Navigation --> */}
							<nav id='navigation'>
								<ul id='responsive'>

									<li><a href='/' className='current'>Home</a>
									</li>

									<li><Link to='/posts'>{displayNameSettings.post}s</Link></li>
									<li><Link to='/services'>{displayNameSettings.service}s</Link></li>

									<li><Link to='/login'>Login</Link>
									</li>

									<li><Link to='/register'>Register</Link></li>
								</ul>
							</nav>
							<div className='clearfix' />
							{/* <!-- Main Navigation / End --> */}

						</div>
						{/* <!-- Left Side Content / End --> */}

						{/* <!-- Right Side Content / End --> */}
						<div className='right-side'>
							{/* <!-- User Menu / End --> */}

							{/* <!-- Mobile Navigation Button --> */}
							<span className='mmenu-trigger'>
								<button className='hamburger hamburger--collapse' type='button'>
									<span className='hamburger-box'>
										<span className='hamburger-inner' />
									</span>
								</button>
							</span>

						</div>
						{/* <!-- Right Side Content / End --> */}

					</div>
				</div>
				{/* <!-- Header / End --> */}

			</header>

		)
	}
}

export default Header
